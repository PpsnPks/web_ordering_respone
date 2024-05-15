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
            id: 'admin.example',
            title: 'ข้อมูลแดชบอร์ด',
            type: 'basic',
            icon: 'heroicons_outline:clipboard-document-check',
            link: '/example',
        },


          {
                id: 'admin.store',
                title: 'ข้อมูลร้านค้า',
                type: 'basic',
                icon: 'heroicons_outline:building-office-2',
                link: '/store/1',
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
            // {
            //     id: 'admin.permission',
            //     title: 'สิทธิ์การใช้งาน',
            //     type: 'basic',
            //     icon: 'heroicons_outline:key',
            //     link: '/admin/permission/list',
            // },
            {
                id: 'promotion',
                title: 'โปรโมชั่น',
                type: 'basic',
                icon: 'heroicons_mini:archive-box',
                link: '/promotion'
            },
            {
                id: 'customers',
                title: 'สมาชิก',
                type: 'basic',
                icon: 'heroicons_solid:rectangle-stack',
                link: '/customers'
            },
            {
              id: 'banner',
              title: 'แบนเนอร์',
              type: 'basic',
              icon: 'heroicons_solid:photo',
              link: '/banner'
          },
          {
            id: 'shift',
            title: 'กะทำงาน',
            type: 'basic',
            icon: 'heroicons_solid:clock',
            link: '/shift'
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
            // {
            //     id: 'admin.category',
            //     title: 'หน้าจอสินค้า',
            //     type: 'basic',
            //     icon: 'heroicons_solid:computer-desktop',
            //     link: '/panel'
            // },
            {
                id: 'admin.category',
                title: 'ประเภทสินค้า',
                type: 'basic',
                icon: 'heroicons_solid:circle-stack',
                link: '/category'
            },
            {
                id: 'unit',
                title: 'หน่วยนับ',
                type: 'basic',
                icon: 'heroicons_solid:inbox-stack',
                link: '/unit'
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
                title: 'รายงานยอดขายรวมทั้งหมด',
                type: 'basic',
                icon: 'heroicons_outline:document-chart-bar',
                link: '/report/total'
            },
            {
                id: 'report.type',
                title: 'รายงานแยกประเภทค่าใช้จ่าย',
                type: 'basic',
                icon: 'heroicons_outline:document-chart-bar',
                link: '/report/payment-type'
            },
            {
                id: 'report.type',
                title: 'รายงานการขายตามแคชเชียร์',
                type: 'basic',
                icon: 'heroicons_outline:document-chart-bar',
                link: '/report/cashier'
            },
            {
                id: 'report.type',
                title: 'รายงานการขายแยกตามประเภทสินค้า',
                type: 'basic',
                icon: 'heroicons_outline:document-chart-bar',
                link: '/report/product-type'
            },
            {
              id: 'report.type',
              title: 'รายงานยอดบิล',
              type: 'basic',
              icon: 'heroicons_outline:document-chart-bar',
              link: '/report/bills'
            },{
                id: 'report.type',
                title: 'รายงานแตะบัตร',
                type: 'basic',
                icon: 'heroicons_outline:document-chart-bar',
                link: '/report/card'
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
                link: '/profile',
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
