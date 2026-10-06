import { captureRemixErrorBoundaryError, captureMessage } from '@sentry/remix';
import { useStore } from '@nanostores/react';
import type { LinksFunction } from '@vercel/remix';
import { json } from '@vercel/remix';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useRouteError,
  useRouteLoaderData,
} from '@remix-run/react';
import { themeStore } from './lib/stores/theme';
import { stripIndents } from 'chef-agent/utils/stripIndent';
import { createHead } from 'remix-island';
import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ClientOnly } from 'remix-utils/client-only';
import { AuthKitProvider, useAuth } from '@workos-inc/authkit-react';
import { ConvexProviderWithAuthKit } from '@convex-dev/workos';
import { ConvexReactClient } from 'convex/react';
import globalStyles from './styles/index.css?url';
import '@convex-dev/design-system/styles/shared.css';
import xtermStyles from '@xterm/xterm/css/xterm.css?url';
import posthog from 'posthog-js';

import 'allotment/dist/style.css';

import { ErrorDisplay } from './components/ErrorComponent';
import useVersionNotificationBanner from './components/VersionNotificationBanner';

const PUBLIC_NANNY_ROUTES = new Set(['/', '/menu', '/worksites', '/events', '/garden', '/story', '/contact']);

export async function loader() {
  const CONVEX_URL = globalThis.process.env.VITE_CONVEX_URL || globalThis.process.env.CONVEX_URL;
  const CONVEX_OAUTH_CLIENT_ID = globalThis.process.env.CONVEX_OAUTH_CLIENT_ID;
  const WORKOS_REDIRECT_URI =
    globalThis.process.env.VITE_WORKOS_REDIRECT_URI || globalThis.process.env.VERCEL_BRANCH_URL;
  return json({
    ENV: { CONVEX_URL, CONVEX_OAUTH_CLIENT_ID, WORKOS_REDIRECT_URI },
  });
}

export const links: LinksFunction = () => [
  {
    rel: 'icon',
    href: '/favicon.svg',
    type: 'image/svg+xml',
  },
  { rel: 'stylesheet', href: globalStyles },
  { rel: 'stylesheet', href: xtermStyles },
  {
    rel: 'preconnect',
    href: 'https://fonts.googleapis.com',
  },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  },
  { rel: 'manifest', href: '/manifest.json' },
];

const inlineThemeCode = stripIndents`
  setTutorialKitTheme();

  function setTutorialKitTheme() {
    let theme = localStorage.getItem('bolt_theme');

    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    document.querySelector('html')?.setAttribute('class', theme);
  }
`;

export const Head = createHead(() => (
  <>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <Meta />
    <Links />
    <script dangerouslySetInnerHTML={{ __html: inlineThemeCode }} />
  </>
));

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const theme = useStore(themeStore);

  useEffect(() => {
    document.querySelector('html')?.setAttribute('class', theme);
  }, [theme]);

  useEffect(() => {
    if (window.location.pathname.startsWith('/admin/')) {
      return;
    }
    const key = import.meta.env.VITE_POSTHOG_KEY || '';
    const apiHost = import.meta.env.VITE_POSTHOG_HOST || '';
    if (!key || !apiHost) {
      return;
    }
    posthog.init(key, {
      api_host: apiHost,
      ui_host: 'https://us.posthog.com/',
      debug: false,
      enable_recording_console_log: false,
      capture_pageview: true,
      persistence: 'memory',
    });
  }, []);

  if (PUBLIC_NANNY_ROUTES.has(location.pathname)) {
    return (
      <>
        {children}
        <ScrollRestoration />
        <Scripts />
      </>
    );
  }

  return <AuthenticatedAppLayout>{children}</AuthenticatedAppLayout>;
}

function AuthenticatedAppLayout({ children }: { children: React.ReactNode }) {
  useVersionNotificationBanner();
  const loaderData = useRouteLoaderData<typeof loader>('root');
  const CONVEX_URL = import.meta.env.VITE_CONVEX_URL || loaderData?.ENV.CONVEX_URL;
  if (!CONVEX_URL) {
    throw new Error('Missing CONVEX_URL for the authenticated Nanny/Chef application.');
  }

  const [convex] = useState(
    () =>
      new ConvexReactClient(CONVEX_URL, {
        unsavedChangesWarning: false,
        onServerDisconnectError: (message) => captureMessage(message),
      }),
  );

  return (
    <>
      <AuthKitProvider
        clientId={import.meta.env.VITE_WORKOS_CLIENT_ID}
        redirectUri={loaderData?.ENV.WORKOS_REDIRECT_URI}
        apiHostname={import.meta.env.VITE_WORKOS_API_HOSTNAME}
      >
        <ClientOnly>
          {() => (
            <DndProvider backend={HTML5Backend}>
              <ConvexProviderWithAuthKit client={convex} useAuth={useAuth}>
                {children}
              </ConvexProviderWithAuthKit>
            </DndProvider>
          )}
        </ClientOnly>
      </AuthKitProvider>

      <ScrollRestoration />
      <Scripts />
    </>
  );
}

export const ErrorBoundary = () => {
  const error = useRouteError();
  captureRemixErrorBoundaryError(error);
  return <ErrorDisplay error={error} />;
};

export default function App() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
