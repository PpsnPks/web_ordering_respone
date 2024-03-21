/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'admin',
        title: 'จัดการระบบ',
        subtitle: 'ขัอมูลเกี่ยวกับระบบ',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [
            {
                id: 'admin.comp',
                title: 'ข้อมูลบริษัท',
                type: 'basic',
                icon: 'heroicons_outline:building-office-2',
                link: '/admin/companie/list',
            },
            // {
            //     id: 'admin.department',
            //     title: 'แผนกงาน',
            //     type: 'basic',
            //     icon: 'heroicons_outline:list-bullet',
            //     link: '/admin/department/list',
            // },
            {
                id: 'user',
                title: 'ผู้ใช้งาน',
                type: 'basic',
                icon: 'heroicons_outline:user-group',
                link: '/user'
            },
            {
                id: 'admin.permission',
                title: 'สิทธิ์การใช้งาน',
                type: 'basic',
                icon: 'heroicons_outline:key',
                link: '/admin/permission/list',
            },
            {
                id: 'store',
                title: 'ร้านค้า',
                type: 'basic',
                icon: 'heroicons_mini:archive-box',
                // link: '/branch'
            },
            {
                id: 'branch',
                title: 'สาขา',
                type: 'basic',
                icon: 'heroicons_mini:archive-box',
                link: '/branch'
            },
            {
                id: 'branch',
                title: 'โปรโมชั่น',
                type: 'basic',
                icon: 'heroicons_mini:archive-box',
                // link: '/branch'
            },
            {
                id: 'customers',
                title: 'ลูกค้า',
                type: 'basic',
                icon: 'heroicons_solid:rectangle-stack',
                link: '/customers'
            },

        ],
    },


    {
        id: 'admin',
        title: 'จัดการข้อมูลสินค้า',
        subtitle: 'ขัอมูลเกี่ยวกับสินค้า',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [
            {
                id: 'admin.category',
                title: 'ประเภทสินค้า',
                type: 'basic',
                icon: 'heroicons_solid:circle-stack',
                link: '/category'
            },
            {
                id: 'AddProduct',
                title: 'สินค้า',
                type: 'basic',
                icon: 'heroicons_solid:squares-plus',
                link: '/product'
            },
     
        ],
    },
    {
        id: 'report',
        title: 'รายงาน',
        subtitle: 'ข้อมูลเกี่ยวกับรายงาน',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [
            {
                id: 'report.category',
                title: 'รายงานยอดขายรวมทัังหมด',
                type: 'basic',
                icon: 'heroicons_outline:document-chart-bar',
                // link: '/category'
            },
            {
                id: 'report.type',
                title: 'รายงานแยกประเภทค่าใช้จ่าย',
                type: 'basic',
                icon: 'heroicons_outline:document-chart-bar',
                // link: '/product'
            },
            {
                id: 'report.type',
                title: 'รายงานการขายตามแคชเชียร์',
                type: 'basic',
                icon: 'heroicons_outline:document-chart-bar',
                // link: '/product'
            },
            {
                id: 'report.type',
                title: 'รายงานการขายแยกตามประเภทสินค้า',
                type: 'basic',
                icon: 'heroicons_outline:document-chart-bar',
                // link: '/product'
            },
     
        ],
    },
    {
        id: 'self',
        title: 'ส่วนตัว',
        subtitle: 'จัดการโปรไฟล์',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [
            {
                id: 'self.employee',
                title: 'แก้ไขข้อมูลส่วนตัว',
                type: 'basic',
                icon: 'heroicons_outline:user',
                link: '/admin/employee/list',
            },
            {
                id: 'admin.logout',
                title: 'ออกจากระบบ',
                type: 'basic',
                icon: 'heroicons_outline:arrow-left-on-rectangle',
                link: '/sign-out',
            },
        ],
    },
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
