import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import SingleProcessAuditPage from '@/components/pages/SingleProcessAuditPage';
import CaseStudiesPage from '@/components/pages/CaseStudiesPage';
import ServiceDetailsPage from '@/components/pages/ServiceDetailsPage';
import AboutLoomPage from '@/components/pages/AboutLoomPage';
import PrivacyPolicyPage from '@/components/pages/PrivacyPolicyPage';
import TermsOfServicePage from '@/components/pages/TermsOfServicePage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "single-process-audit",
        element: <SingleProcessAuditPage />,
        routeMetadata: {
          pageIdentifier: 'single-process-audit',
        },
      },
      {
        path: "case-studies",
        element: <CaseStudiesPage />,
        routeMetadata: {
          pageIdentifier: 'case-studies',
        },
      },
      {
        path: "service/:id",
        element: <ServiceDetailsPage />,
        routeMetadata: {
          pageIdentifier: 'service-details',
        },
      },
      {
        path: "about-loom",
        element: <AboutLoomPage />,
        routeMetadata: {
          pageIdentifier: 'about-loom',
        },
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicyPage />,
        routeMetadata: {
          pageIdentifier: 'privacy-policy',
        },
      },
      {
        path: "terms-of-service",
        element: <TermsOfServicePage />,
        routeMetadata: {
          pageIdentifier: 'terms-of-service',
        },
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
