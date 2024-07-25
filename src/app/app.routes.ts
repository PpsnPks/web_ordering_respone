import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

    // Redirect signed-in user to the '/example'
    //
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'dashboard' },

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.routes') },
            { path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.routes') },
            { path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.routes') },
            { path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.routes') },
            { path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.routes') },

        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.routes') },
            { path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.routes') }
        ]
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'home', loadChildren: () => import('app/modules/landing/home/home.routes') },
        ]
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver
        },
        children: [
            { path: 'dashboards', loadChildren: () => import('app/modules/admin/dashboard/dashboard.routes') },
            { path: 'dashboard', loadChildren: () => import('app/modules/admin/dashboard/dashboard.routes') },
            { path: 'user', loadChildren: () => import('app/modules/admin/user/user.routes') },
            { path: 'branch', loadChildren: () => import('app/modules/admin/branch/page.routes') },
            { path: 'banner', loadChildren: ()=> import('app/modules/admin/banner/banner.routes')},
            { path: 'member', loadChildren: () => import('app/modules/admin/member/member.routes') },
            { path: 'panel', loadChildren: () => import('app/modules/admin/panel/page.routes')},
            { path: 'category', loadChildren: () => import('app/modules/admin/category/page.routes') },
            { path: 'product', loadChildren: () => import('app/modules/admin/product/page.routes') },
            { path: 'report', loadChildren: () => import('app/modules/admin/report/report.routes') },
            { path: 'store', loadChildren: () => import('app/modules/admin/store/page.routes') },
            { path: 'promotion', loadChildren: () => import('app/modules/admin/promotion/page.routes') },
            { path: 'unit', loadChildren: () => import('app/modules/admin/unit/page.routes') },
            { path: 'profile', loadChildren: () => import('app/modules/admin/profile/profile.routes') },
            { path: 'shift', loadChildren: () => import('app/modules/admin/shift/shift.routes') },
            { path: 'credit', loadChildren: () => import('app/modules/admin/credit/credit.routes') },
            { path: 'device', loadChildren: () => import('app/modules/admin/device/page.routes') },
            { path: 'tap-log', loadChildren: () => import('app/modules/admin/tap-log/page.routes') },
            { path: 'order', loadChildren: () => import('app/modules/admin/order/order.routes') },
            { path: 'role', loadChildren: () => import('app/modules/admin/rightinfo/page.routes')}
        ]
    }
];
