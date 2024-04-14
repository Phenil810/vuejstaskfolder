import { createRouter, createWebHistory } from 'vue-router';


const apartmentlistpagination = ["ComplexManagementList", "AddComplexManagement" ,"EditComplexManagement" ];
const userlistpagination = ["GeneralUserManagementList", "GeneralUserManagementEdit" ,"GeneralUserManagementview" ];
const adminuserlist = ["AdminUserManagementlist", "AdminUserManagementAdd" ,"AdminUserManagementEdit" ,"AdminUserManagementview" ];
const postlist = ["PostManagementList", "ViewPostManagement"  ];
const honey = ["HoneyManagementList" ,"ManageHoney"];
const NoticeManagement = ["NoticeManagementlist","NoticeManagementadd","NoticeManagementview","NoticeManagementedit"];
const NotificationManagement = ["NotificationManagementList","AddNotificationManagement","NotificationManagementdetail"];
const Subscriptionpathmanagement = ["Subscriptionpathmanagementlist","Subscriptionpathmanagementadd"];
const TagManagement = ["TagManagementlist","TagManagementadd","TagManagementEdit","TagManagementView"];
const product = ["ProductManagementList","AddProductManagement","EditProductManagement","ViewProductManagement"];
const ProductPurchaseManagement =["ProductPurchaseManagementList"];
const PromotionalPostManagement = ["PromotionalPostManagementList","PromotionalPostManagementDetail"];
const HotPostManagement = ["HotPostManagementList","HotPostManagementDetail","HotPostManagementEdit"];
const honeyTransferHistory = ["HoneyTransferHistoryList","HoneyTransferHistoryDetail"];

function guest(to, from, next) {
    if (localStorage.token) {
        next({ name: 'dashboard' });
    } else next();
}

function guard(to, from, next) {
    if (localStorage.token) {

        console.log(to, 'to');
        console.log(from, 'from');
        if (!apartmentlistpagination.includes(from.name )) {
            localStorage.removeItem('apartmentlistpagination');
        } 

        if (!userlistpagination.includes(from.name )) {
            localStorage.removeItem('userlistpagination');
        }

        if (!adminuserlist.includes(from.name )) {
            localStorage.removeItem('adminuserlist');
        }

        if (!postlist.includes(from.name )) {
            localStorage.removeItem('postlist');
        }

        if (!honey.includes(from.name )) {
            localStorage.removeItem('honey');
        }

        if (!NoticeManagement.includes(from.name )) {
            localStorage.removeItem('NoticeManagement');
        }

        if (!NotificationManagement.includes(from.name )) {
            localStorage.removeItem('NotificationManagement');
        }

        if (!Subscriptionpathmanagement.includes(from.name )) {
            localStorage.removeItem('Subscriptionpathmanagement');
        }

        if (!TagManagement.includes(from.name )) {
            localStorage.removeItem('TagManagement');
        }

        if (!product.includes(from.name )) {
            localStorage.removeItem('product');
        }

        if (!ProductPurchaseManagement.includes(from.name )) {
            localStorage.removeItem('ProductPurchaseManagement');
        }

        if (!PromotionalPostManagement.includes(from.name )) {
            localStorage.removeItem('PromotionalPostManagement');
        }

        if (!HotPostManagement.includes(from.name )) {
            localStorage.removeItem('HotPostManagement');
        }

        if (!honeyTransferHistory.includes(from.name )) {
            localStorage.removeItem('honeyTransferHistory');
        }

        next();
    } else {
        next({ name: 'login' });
    }
}



const routes = [
    // {
    //     path: '/',
    //     name: 'dashboard',
    //     exact: true,
    //     component: () => import('./components/Dashboard.vue'),
    //     beforeEnter: guard,
    //     meta: {
    //         breadcrumb: [{ parent: 'Dashboard', label: 'Dashboard' }],
    //     },
    // },
    {
        path: '/',
        name: 'dashboard',
        exact: true,
        component: () => import(`./pages/ApartmentComplexManagement/ComplexManagementList.vue`),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'Dashboard', label: 'Dashboard' }],
        },
    },
    // Apartment Complex Management start
    {
        path: '/ComplexManagementList',
        name: 'ComplexManagementList',
        component: () => import('./pages/ApartmentComplexManagement/ComplexManagementList.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'ComplexManagementList' }],
        },
    },
    {
        path: '/AddComplexManagement',
        name: 'AddComplexManagement',
        component: () => import('./pages/ApartmentComplexManagement/AddComplexManagement.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'AddComplexManagement' }],
        },
    },

    {
        path: '/EditComplexManagement/:id',
        name: 'EditComplexManagement',
        component: () => import('./pages/ApartmentComplexManagement/EditComplexManagement.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'EditComplexManagement' }],
        },
    },

    //Apartment Complex Management end

    // GS User Management start

    // GS General User Management Start

    {
        path: '/UserManagement/GeneralUserManagement/GeneralUserManagementList',
        name: 'GeneralUserManagementList',
        component: () => import('./pages/UserManagement/GeneralUserManagement/GeneralUserManagementList.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'GeneralUserManagementList' }],
        },
    },
    {
        path: '/UserManagement/GeneralUserManagement/GeneralUserManagementEdit/:id',
        name: 'GeneralUserManagementEdit',
        component: () => import('./pages/UserManagement/GeneralUserManagement/GeneralUserManagementEdit.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'GeneralUserManagementEdit' }],
        },
    },
    {
        path: '/UserManagement/GeneralUserManagement/GeneralUserManagementview/:id',
        name: 'GeneralUserManagementview',
        component: () => import('./pages/UserManagement/GeneralUserManagement/GeneralUserManagementview.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'GeneralUserManagementview' }],
        },
    },

    // GS General User Management End

    // GS Admin User Management start

    {
        path: '/UserManagement/AdminUserManagement/AdminUserManagementlist',
        name: 'AdminUserManagementlist',
        component: () => import('./pages/UserManagement/AdminUserManagement/AdminUserManagementlist.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'AdminUserManagementlist' }],
        },
    },
    {
        path: '/UserManagement/AdminUserManagement/AdminUserManagementAdd',
        name: 'AdminUserManagementAdd',
        component: () => import('./pages/UserManagement/AdminUserManagement/AdminUserManagementAdd.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'AdminUserManagementAdd' }],
        },
    },

    {
        path: '/UserManagement/AdminUserManagement/AdminUserManagementEdit/:id',
        name: 'AdminUserManagementEdit',
        component: () => import('./pages/UserManagement/AdminUserManagement/AdminUserManagementEdit.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'AdminUserManagementEdit' }],
        },
    },

    {
        path: '/UserManagement/AdminUserManagement/AdminUserManagementview/:id',
        name: 'AdminUserManagementview',
        component: () => import('./pages/UserManagement/AdminUserManagement/AdminUserManagementview.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'AdminUserManagementview' }],
        },
    },

    // GS Admin User Management end

    
    {
        path: '/UserManagementList',
        name: 'UserManagementList',
        component: () => import('./pages/UserManagement/UserManagementList.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'UserManagementList' }],
        },
    },
    {
        path: '/EditUsermanagement/:id',
        name: 'EditUsermanagement',
        component: () => import('./pages/UserManagement/EditUsermanagement.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'EditUsermanagement' }],
        },
    },

    {
        path: '/ViewUserManagement/:id',
        name: 'ViewUserManagement',
        component: () => import('./pages/UserManagement/ViewUserManagement.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'ViewUserManagement' }],
        },
    },

    // GS User Management end

    // GS Post Management start

    {
        path: '/PostManagementList',
        name: 'PostManagementList',
        component: () => import('./pages/PostManagement/PostManagementList.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'PostManagementList' }],
        },
    },
    {
        path: '/ViewPostManagement/:id',
        name: 'ViewPostManagement',
        component: () => import('./pages/PostManagement/ViewPostManagement.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'ViewPostManagement' }],
        },
    },

    // GS Post Management end

    // GS Honey History start

    {
        path: '/HoneyManagementList',
        name: 'HoneyManagementList',
        component: () => import('./pages/HoneyHistory/HoneyManagementList.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'HoneyManagementList' }],
        },
    },
    {
        path: '/ManageHoney/:id',
        name: 'ManageHoney',
        component: () => import('./pages/HoneyHistory/ManageHoney.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'ManageHoney' }],
        },
    },

    // GS Honey History end


    // GS Reward Management start

    
    {
        path: '/RewardManagementList',
        name: 'RewardManagementList',
        component: () => import('./pages/RewardManagement/RewardManagementList.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'RewardManagementList' }],
        },
    },
    {
        path: '/EditRewardManagement/:id',
        name: 'EditRewardManagement',
        component: () => import('./pages/RewardManagement/EditRewardManagement.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'EditRewardManagement' }],
        },
    },

    {
        path: '/EditPostManagement/:id',
        name: 'EditPostManagement',
        component: () => import('./pages/RewardManagement/EditPostManagement.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'EditPostManagement' }],
        },
    },

    {
        path: '/EditPostRegistrationRewards/:id',
        name: 'EditPostRegistrationRewards',
        component: () => import('./pages/RewardManagement/EditPostRegistrationRewards.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'EditPostRegistrationRewards' }],
        },
    },

    // GS Reward Management end

    // GS Product management start

    {
        path: '/ProductManagementList',
        name: 'ProductManagementList',
        component: () => import('./pages/ProductManagement/ProductManagementList.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'ProductManagementList' }],
        },
    },

    {
        path: '/AddProductManagement',
        name: 'AddProductManagement',
        component: () => import('./pages/ProductManagement/AddProductManagement.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'AddProductManagement' }],
        },
    },

    {
        path: '/EditProductManagement/:id',
        name: 'EditProductManagement',
        component: () => import('./pages/ProductManagement/EditProductManagement.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'EditProductManagement' }],
        },
    },

    {
        path: '/ViewProductManagement/:id',
        name: 'ViewProductManagement',
        component: () => import('./pages/ProductManagement/ViewProductManagement.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'ViewProductManagement' }],
        },
    },

    // GS Product management end

     // GS Product Purchase Management start

     {
        path: '/ProductPurchaseManagementList',
        name: 'ProductPurchaseManagementList',
        component: () => import('./pages/ProductPurchaseManagement/ProductPurchaseManagementList.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'ProductPurchaseManagementList' }],
        },
    },

      // GS Product Purchase Management end

    // GS General Management start
    // GS Notice Management start
    {
        path: '/GeneralManagement/NoticeManagement/NoticeManagementlist',
        name: 'NoticeManagementlist',
        component: () => import('./pages/GeneralManagement/NoticeManagement/NoticeManagementlist.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'NoticeManagementlist' }],
        },
    },
    {
        path: '/GeneralManagement/NoticeManagement/NoticeManagementadd',
        name: 'NoticeManagementadd',
        component: () => import('./pages/GeneralManagement/NoticeManagement/NoticeManagementadd.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'NoticeManagementadd' }],
        },
    },
    {
        path: '/GeneralManagement/NoticeManagement/NoticeManagementview/:id',
        name: 'NoticeManagementview',
        component: () => import('./pages/GeneralManagement/NoticeManagement/NoticeManagementview.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'NoticeManagementview' }],
        },
    },
    {
        path: '/GeneralManagement/NoticeManagement/NoticeManagementedit/:id',
        name: 'NoticeManagementedit',
        component: () => import('./pages/GeneralManagement/NoticeManagement/NoticeManagementedit.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'NoticeManagementedit' }],
        },
    },

    // GS Notice Management end


    // GS Notification Management start

    {
        path: '/GeneralManagement/NotificationManagement/NotificationManagementList',
        name: 'NotificationManagementList',
        component: () => import('./pages/GeneralManagement/NotificationManagement/NotificationManagementList.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'NotificationManagementList' }],
        },
    },

    {
        path: '/GeneralManagement/NotificationManagement/AddNotificationManagement',
        name: 'AddNotificationManagement',
        component: () => import('./pages/GeneralManagement/NotificationManagement/AddNotificationManagement.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'AddNotificationManagement' }],
        },
    },

    {
        path: '/GeneralManagement/NotificationManagement/NotificationManagementdetail/:id',
        name: 'NotificationManagementdetail',
        component: () => import('./pages/GeneralManagement/NotificationManagement/NotificationManagementdetail.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'NotificationManagementdetail' }],
        },
    },

    // GS Notification Management end

    // GS Weekly Report start
    {
        path: '/DownloadWeeklyReport/WeeklyReport',
        name: 'WeeklyReport',
        component: () => import('./pages/DownloadWeeklyReport/WeeklyReport.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'WeeklyReport' }],
        },
    },
    
    // GS Weekly Report end

    // GS Tag Management start

    {
        path: '/GeneralManagement/TagManagement/TagManagementlist',
        name: 'TagManagementlist',
        component: () => import('./pages/GeneralManagement/TagManagement/TagManagementlist.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'TagManagementlist' }],
        },
    },
    {
        path: '/GeneralManagement/TagManagement/TagManagementadd',
        name: 'TagManagementadd',
        component: () => import('./pages/GeneralManagement/TagManagement/TagManagementadd.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'TagManagementadd' }],
        },
    },
    {
        path: '/GeneralManagement/TagManagement/TagManagementEdit/:id',
        name: 'TagManagementEdit',
        component: () => import('./pages/GeneralManagement/TagManagement/TagManagementEdit.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'TagManagementEdit' }],
        },
    },
    {
        path: '/GeneralManagement/TagManagement/TagManagementView/:id',
        name: 'TagManagementView',
        component: () => import('./pages/GeneralManagement/TagManagement/TagManagementView.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'TagManagementView' }],
        },
    },

    // GS Tag Management end

    // GS Subscription Path Management  start

    {
        path: '/GeneralManagement/Subscriptionpathmanagement/Subscriptionpathmanagementlist',
        name: 'Subscriptionpathmanagementlist',
        component: () => import('./pages/GeneralManagement/Subscriptionpathmanagement/Subscriptionpathmanagementlist.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'Subscriptionpathmanagementlist' }],
        },
    },
    {
        path: '/GeneralManagement/Subscriptionpathmanagement/Subscriptionpathmanagementadd',
        name: 'Subscriptionpathmanagementadd',
        component: () => import('./pages/GeneralManagement/Subscriptionpathmanagement/Subscriptionpathmanagementadd.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'Subscriptionpathmanagementadd' }],
        },
    },

    // GS Subscription Path Management  end

    // GS Promotional Post Management start

    {
        path: '/PromotionalPostManagement/PromotionalPostManagementList',
        name: 'PromotionalPostManagementList',
        component: () => import('./pages/PromotionalPostManagement/PromotionalPostManagementList.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'PromotionalPostManagementList' }],
        },
    },

    {
        path: '/PromotionalPostManagement/PromotionalPostManagementDetail/:id',
        name: 'PromotionalPostManagementDetail',
        component: () => import('./pages/PromotionalPostManagement/PromotionalPostManagementDetail.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'PromotionalPostManagementDetail' }],
        },
    },


    // GS Promotional Post Management end

    // GS Hot Post Management start

    {
        path: '/HotPostManagementList',
        name: 'HotPostManagementList',
        component: () => import('./pages/HotPostManagement/HotPostManagementList.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'HotPostManagementList' }],
        },
    },

    {
        path: '/HotPostManagementEdit/:id',
        name: 'HotPostManagementEdit',
        component: () => import('./pages/HotPostManagement/HotPostManagementEdit.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'HotPostManagementEdit' }],
        },
    },

    {
        path: '/HotPostManagementDetail/:id',
        name: 'HotPostManagementDetail',
        component: () => import('./pages/HotPostManagement/HotPostManagementDetail.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'HotPostManagementDetail' }],
        },
    },

    // GS Hot Post Management end

    // GS Honey Transfer History Start

    {
        path: '/HoneyTransferHistoryList',
        name: 'HoneyTransferHistoryList',
        component: () => import('./pages/HoneyTransferHistory/HoneyTransferHistoryList.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'HoneyTransferHistoryList' }],
        },
    },

    {
        path: '/HoneyTransferHistoryDetail/:id',
        name: 'HoneyTransferHistoryDetail',
        component: () => import('./pages/HoneyTransferHistory/HoneyTransferHistoryDetail.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'HoneyTransferHistoryDetail' }],
        },
    },

    // GS Honey Transfer History End


    // GS General Management end

    // account information start
    {
        path: '/account-info',
        name: 'AccountInfo',
        component: () => import('./pages/AccountManagement/AccontInfo.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'accountinfo' }],
        },
    },
    {
        path: '/change-pass',
        name: 'ChangePass',
        component: () => import('./pages/AccountManagement/ChangePass.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'ChangePass' }],
        },
    },
    {
        path: '/modify-info',
        name: 'EditInfo',
        component: () => import('./pages/AccountManagement/EditInfo.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'EditInfo' }],
        },
    },
    //account information end




    //dfc_banner start
    {
        path: '/banner-management',
        name: 'BannerManagement',
        component: () => import('./pages/BannerManagemet/BannerList.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'bannerlist' }],
        },
    },
    {
        path: '/add-banner',
        name: 'AddBanner',
        component: () => import('./pages/BannerManagemet/AddBanner.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'addbanner' }],
        },
    },
    {
        path: '/edit-banner/:id',
        name: 'EditBanner',
        component: () => import('./pages/BannerManagemet/EditBanner.vue'),
        beforeEnter: guard,
    },
    {
        path: '/view-banner/:id',
        name: 'ViewBanner',
        component: () => import('./pages/BannerManagemet/ViewBanner.vue'),
        beforeEnter: guard,
    },
    //dfc_banner end
    //Media_press start
    {
        path: '/media-press',
        name: 'MediaPressManagement',
        component: () => import('./pages/MediaPress/MediaPressList.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'mediapress-list' }],
        },
    },
    {
        path: '/add-media-press',
        name: 'AddMediaPress',
        component: () => import('./pages/MediaPress/AddMediaPress.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'add-mediapress' }],
        },
    },
    {
        path: '/view-media-press/:id',
        name: 'ViewMediaPress',
        component: () => import('./pages/MediaPress/ViewMediaPress.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'view-mediapress' }],
        },
    },
    {
        path: '/edit-media-press/:id',
        name: 'EditMediaPress',
        component: () => import('./pages/MediaPress/EditMediaPress.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'edit-mediapress' }],
        },
    },
    //Media_press end
    //client-lookup start
    {
        path: '/client-lookup',
        name: 'ClientLookup',
        component: () => import('./pages/dfc_user/ClientLookup.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'Client lookup' }],
        },
    },
    {
        path: '/uploaded-doclist',
        name: 'UploadedDoclist',
        component: () => import('./pages/dfc_user/UploadDoclist.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'Upload Doclist' }],
        },
    },
    {
        path: '/upload-document',
        name: 'UploadDoc',
        component: () => import('./pages/dfc_user/UploadDoc.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'Upload' }],
        },
    },
    {
        path: '/client-lookup/details/:id',
        name: 'Clientdetails',
        exact: true,
        component: () => import('./pages/dfc_user/ClientDetails.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'page', label: 'Client details' }],
        },
    },
    {
        path: '/dfc_user/personal-info',
        name: 'Personaldetails',
        exact: true,
        component: () => import('./pages/dfc_user/DfcPersonalinfo.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'page', label: 'personal details' }],
        },
    },
    //client-lookup end
    //Card-news start
    {
        path: '/card-news',
        name: 'CardNewsManagement',
        component: () => import('./pages/CardNews/CardNewsList.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'Card-News list' }],
        },
    },
    {
        path: '/add-card-news',
        name: 'AddCardNews',
        component: () => import('./pages/CardNews/AddCardNews.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'Add-CardNews' }],
        },
    },
    {
        path: '/card-news/edit/:id',
        name: 'CardNewsedit',
        component: () => import('./pages/CardNews/EditCardNews.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'Pages', label: 'Edit-cardnews' }],
        },
    },
    {
        path: '/card-news/view/:id',
        name: 'CardNewsView',
        component: () => import('./pages/CardNews/ViewCardNews.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'Pages', label: 'View-cardnews' }],
        },
    },
    //Card-news end
    //NFT_start
    {
        path: '/nft-management',
        name: 'NftManagement',
        component: () => import('./pages/NftManagement/NftList.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'Nftlist' }],
        },
    },
    {
        path: '/add-NFT',
        name: 'AddNft',
        component: () => import('./pages/NftManagement/AddNft.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'Add-Nft' }],
        },
    },
    {
        path: '/edit-nft/:id',
        name: 'EditNft',
        component: () => import('./pages/NftManagement/EditNft.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'Edit-Nft' }],
        },
    },
    {
        path: '/view-nft/:id',
        name: 'ViewNft',
        component: () => import('./pages/NftManagement/ViewNft.vue'),
        beforeEnter: guard,
        // meta: {
        //     breadcrumb: [{ parent: 'pages', label: 'View-Nft' }],
        // },
    },
    {
        path: '/edit-nft/:id',
        name: 'EditNft',
        component: () => import('./pages/NftManagement/EditNft.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'Edit-Nft' }],
        },
    },
    //NFT_end
    //dfc_popup start
    {
        path: '/popup-management',
        name: 'PopupManagement',
        component: () => import('./pages/PopupManagement/Popup.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'popuplist' }],
        },
    },
    {
        path: '/view-popup/:id',
        name: 'ViewPopupManagement',
        component: () => import('./pages/PopupManagement/ViewPopup.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'popup-view' }],
        },
    },
    {
        path: '/edit-popup/:id',
        name: 'EditPopupManagement',
        component: () => import('./pages/PopupManagement/EditPopup.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'popup-edit' }],
        },
    },

    //dfc management start
    {
        path: '/dfc-management',
        name: 'Dfc',
        exact: true,
        component: () => import('./pages/DfcManagement/DfcList.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'dfc' }],
        },
    },
    {
        path: '/view-dfc/:id',
        name: 'ViewDfc',
        exact: true,
        component: () => import('./pages/DfcManagement/Viewdfc.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'view-dfc' }],
        },
    },
    {
        path: '/add-dfc',
        name: 'AddDfc',
        exact: true,
        component: () => import('./pages/DfcManagement/AddDfc.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'Add-dfc' }],
        },
    },
    {
        path: '/edit-dfc/:id',
        name: 'EditDfc',
        exact: true,
        component: () => import('./pages/DfcManagement/EditDfc.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'edit-dfc' }],
        },
    },
    //dfc management end

    //Frontend Popup Management start
    {
        path: '/FrontendPopup-management',
        name: 'FrontendPopup',
        exact: true,
        component: () => import('./pages/FrontendPopup/PopupList.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'popup-list' }],
        },
    },
    {
        path: '/FrontendEdit-Popup/:id',
        name: 'FrontendEditPopup',
        exact: true,
        component: () => import('./pages/FrontendPopup/FrontendEditPopup.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'Edit-popup' }],
        },
    },
    {
        path: '/FrontendPreview-Popup/:id',
        name: 'FrontendPreviewPopup',
        exact: true,
        component: () => import('./pages/FrontendPopup/PreviewPopup.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'pages', label: 'Preview-popup' }],
        },
    },
    //Frontend Popup Mangement end

    //google-form start
    // {
    //     path: '/google-form',
    //     name: 'GoogleForm',
    //     exact: true,
    //     component: () => import('./pages/Googleform/GoogleFormList.vue'),
    //     beforeEnter: guard,
    //     meta: {
    //         breadcrumb: [{ parent: 'User', label: 'google form' }],
    //     },
    // },
    //google-form end
    {
        path: '/user',
        name: 'User',
        exact: true,
        component: () => import('./pages/user/User.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'User', label: 'User' }],
        },
    },
    {
        path: '/add-user',
        name: 'Adduser',
        exact: true,
        component: () => import('./pages/user/Adduser.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'User', label: 'Add User' }],
        },
    },
    {
        path: '/user/view-user/:id',
        name: 'ViewUser',
        exact: true,
        component: () => import('./pages/user/ViewUser.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'User', label: 'View User' }],
        },
    },
    {
        path: '/edit-notice/:id',
        name: 'editNotice',
        exact: true,
        component: () => import('./pages/notice/EditNotice.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'Notice', label: 'Edit Notice' }],
        },
    },
    {
        path: '/user/edit-user/:id',
        name: 'UpdateUser',
        exact: true,
        component: () => import('./pages/user/UpdateUser.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'User', label: 'Update User' }],
        },
    },
    {
        path: '/notice',
        name: 'NoticeList',
        component: () => import('./pages/notice/NoticeList.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'Pages', label: 'NoticePage' }],
        },
    },
    {
        path: '/add-notice',
        name: 'Addnotice',
        exact: true,
        component: () => import('./pages/notice/AddNotice.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'Notice', label: 'Add Notice' }],
        },
    },
    {
        path: '/view-notice/:id',
        name: 'ViewNotice',
        exact: true,
        component: () => import('./pages/notice/ViewNotice.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'Notice', label: 'View Notice' }],
        },
    },
    // {
    //     path: '/inquiry-type',
    //     name: 'InquiryType',
    //     exact: true,
    //     component: () => import('./pages/inquiry/InquiryType.vue'),
    //     beforeEnter: guard,
    //     meta: {
    //         breadcrumb: [{ parent: 'pages', label: 'InquiryType' }],
    //     },
    // },
    // {
    //     path: '/add-inquiry-type',
    //     name: 'AddInquiryType',
    //     exact: true,
    //     component: () => import('./pages/inquiry/AddInquiryType.vue'),
    //     beforeEnter: guard,
    //     meta: {
    //         breadcrumb: [{ parent: 'pages', label: 'AddInquiryType' }],
    //     },
    // },
    // {
    //     path: '/edit-inquiry-type/:id',
    //     name: 'EditInquiryType',
    //     exact: true,
    //     component: () => import('./pages/inquiry/EditInquiryType.vue'),
    //     beforeEnter: guard,
    //     meta: {
    //         breadcrumb: [{ parent: 'pages', label: 'EditInquiryType' }],
    //     },
    // },
    // {
    //     path: '/inquiry',
    //     name: 'Inquiry',
    //     exact: true,
    //     component: () => import('./pages/inquiry/Inquiry.vue'),
    //     beforeEnter: guard,
    //     meta: {
    //         breadcrumb: [{ parent: 'Inuery', label: 'inquiry list' }],
    //     },
    // },
    // {
    //     path: '/edit-inquiry/:id',
    //     name: 'EditInquiry',
    //     exact: true,
    //     component: () => import('./pages/inquiry/EditInquiry.vue'),
    //     beforeEnter: guard,
    //     meta: {
    //         breadcrumb: [{ parent: 'pages', label: 'EditInquiry' }],
    //     },
    // },
    {
        path: '/formlayout',
        name: 'formlayout',
        component: () => import('./components/FormLayoutDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'UI Kit', label: 'Form Layout' }],
        },
    },
    {
        path: '/input',
        name: 'input',
        component: () => import('./components/InputDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'UI Kit', label: 'Input' }],
        },
    },
    {
        path: '/floatlabel',
        name: 'floatlabel',
        component: () => import('./components/FloatLabelDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'UI Kit', label: 'Float Label' }],
        },
    },
    {
        path: '/invalidstate',
        name: 'invalidstate',
        component: () => import('./components/InvalidStateDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'UI Kit', label: 'Invalid State' }],
        },
    },
    {
        path: '/button',
        name: 'button',
        component: () => import('./components/ButtonDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'UI Kit', label: 'Button' }],
        },
    },
    {
        path: '/table',
        name: 'table',
        component: () => import('./components/TableDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'UI Kit', label: 'Table' }],
        },
    },
    {
        path: '/list',
        name: 'list',
        component: () => import('./components/ListDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'UI Kit', label: 'List' }],
        },
    },
    {
        path: '/tree',
        name: 'tree',
        component: () => import('./components/TreeDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'UI Kit', label: 'Tree' }],
        },
    },
    {
        path: '/panel',
        name: 'panel',
        component: () => import('./components/PanelsDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'UI Kit', label: 'Panel' }],
        },
    },
    {
        path: '/overlay',
        name: 'overlay',
        component: () => import('./components/OverlayDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'UI Kit', label: 'Overlay' }],
        },
    },
    {
        path: '/media',
        name: 'media',
        component: () => import('./components/MediaDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'UI Kit', label: 'Media' }],
        },
    },
    {
        path: '/menu',
        component: () => import('./components/MenuDemo.vue'),
        children: [
            {
                path: '',
                component: () => import('./components/menu/PersonalDemo.vue'),
                meta: {
                    breadcrumb: [{ parent: 'UI Kit', label: 'Menu' }],
                },
            },
            {
                path: '/menu/seat',
                component: () => import('./components/menu/SeatDemo.vue'),
                meta: {
                    breadcrumb: [{ parent: 'UI Kit', label: 'Menu' }],
                },
            },
            {
                path: '/menu/payment',
                component: () => import('./components/menu/PaymentDemo.vue'),
                meta: {
                    breadcrumb: [{ parent: 'UI Kit', label: 'Menu' }],
                },
            },
            {
                path: '/menu/confirmation',
                component: () => import('./components/menu/ConfirmationDemo.vue'),
                meta: {
                    breadcrumb: [{ parent: 'UI Kit', label: 'Menu' }],
                },
            },
        ],
    },
    {
        path: '/messages',
        name: 'messages',
        component: () => import('./components/MessagesDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'UI Kit', label: 'Messages' }],
        },
    },
    {
        path: '/file',
        name: 'file',
        component: () => import('./components/FileDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'UI Kit', label: 'File' }],
        },
    },
    {
        path: '/chart',
        name: 'chart',
        component: () => import('./components/ChartDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'UI Kit', label: 'Charts' }],
        },
    },
    {
        path: '/misc',
        name: 'misc',
        component: () => import('./components/MiscDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'UI Kit', label: 'Misc' }],
        },
    },
    {
        path: '/icons',
        name: 'icons',
        component: () => import('./utilities/Icons.vue'),
        meta: {
            breadcrumb: [{ parent: 'Utilities', label: 'Icons' }],
        },
    },
    {
        path: '/widgets',
        name: 'widgets',
        component: () => import('./utilities/Widgets.vue'),
        meta: {
            breadcrumb: [{ parent: 'Utilities', label: 'Widgets' }],
        },
    },
    {
        path: '/grid',
        name: 'grid',
        component: () => import('./utilities/GridDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'Utilities', label: 'Grid System' }],
        },
    },
    {
        path: '/spacing',
        name: 'spacing',
        component: () => import('./utilities/SpacingDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'Utilities', label: 'Spacing' }],
        },
    },
    {
        path: '/elevation',
        name: 'elevation',
        component: () => import('./utilities/ElevationDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'Utilities', label: 'Elevation' }],
        },
    },
    {
        path: '/typography',
        name: 'typography',
        component: () => import('./utilities/Typography.vue'),
        meta: {
            breadcrumb: [{ parent: 'Utilities', label: 'Typography' }],
        },
    },
    {
        path: '/display',
        name: 'display',
        component: () => import('./utilities/DisplayDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'Utilities', label: 'Display' }],
        },
    },
    {
        path: '/flexbox',
        name: 'flexbox',
        component: () => import('./utilities/FlexBoxDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'Utilities', label: 'Flexbox' }],
        },
    },
    {
        path: '/text',
        name: 'text',
        component: () => import('./utilities/TextDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'Utilities', label: 'Text' }],
        },
    },
    {
        path: '/crud',
        name: 'crud',
        component: () => import('./pages/CrudDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'Pages', label: 'Crud' }],
        },
    },
    {
        path: '/calendar',
        name: 'calendar',
        component: () => import('./pages/CalendarDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'Pages', label: 'Calendar' }],
        },
    },
    {
        path: '/timeline',
        name: 'timeline',
        component: () => import('./pages/TimelineDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'Pages', label: 'Timeline' }],
        },
    },
    {
        path: '/invoice',
        name: 'invoice',
        component: () => import('./pages/Invoice.vue'),
        meta: {
            breadcrumb: [{ parent: 'Pages', label: 'Invoice' }],
        },
    },
    {
        path: '/help',
        name: 'help',
        component: () => import('./pages/Help.vue'),
        meta: {
            breadcrumb: [{ parent: 'Pages', label: 'Help' }],
        },
    },
    {
        path: '/empty',
        name: 'empty',
        component: () => import('./components/EmptyPage.vue'),
        meta: {
            breadcrumb: [{ parent: 'Pages', label: 'Empty Page' }],
        },
    },
    {
        path: '/documentation',
        name: 'documentation',
        component: () => import('./components/Documentation.vue'),
        meta: {
            breadcrumb: [{ parent: 'Pages', label: 'Documentation' }],
        },
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./pages/Login.vue'),
        beforeEnter: guest,
    }, 

    {
        path: '/forgotpassword',
        name: 'forgotpassword',
        component: () => import('./pages/forgotpassword.vue'),
        beforeEnter: guest,
    },
    {
        path: '/OtpEnter',
        name: 'OtpEnter',
        component: () => import('./pages/OtpEnter.vue'),
        beforeEnter: guest,
    },
    {
        path: '/changepassword',
        name: 'changepassword',
        component: () => import('./pages/changepassword.vue'),
        beforeEnter: guest,
    },
    {
        path: '/error',
        name: 'error',
        component: () => import('./pages/Error.vue'),
    },
    {
        path: '/privacy',
        name: 'Privacy',
        component: () => import('./pages/Privacy.vue'),
    },
    {
        path: '/term-conditions',
        name: 'TermCondition',
        component: () => import('./pages/TermCondition.vue'),
    },
    {
        path: '/notfound',
        name: 'notfound',
        component: () => import('./pages/NotFound.vue'),
    },
    {
        path: '/access',
        name: 'access',
        component: () => import('./pages/Access.vue'),
    },
    {
        path: '/cms',
        name: 'Cms',
        component: () => import('./pages/cms/Cms.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'Pages', label: 'Cms' }],
        },
    },

    {
        path: '/faq',
        name: 'Faq',
        component: () => import('./pages/faq/FaqList.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'Pages', label: 'Faq' }],
        },
    },

    {
        path: '/faq/edit/:id',
        name: 'Faqedit',
        component: () => import('./pages/faq/EditFaq.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'Pages', label: 'EditFaq' }],
        },
    },
    {
        path: '/faq/view/:id',
        name: 'Faqview',
        component: () => import('./pages/faq/ViewFaq.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'Pages', label: 'ViewFaq' }],
        },
    },

    {
        path: '/faq/add',
        name: 'Faqadd',
        component: () => import('./pages/faq/AddFaq.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'Pages', label: 'Faqadd' }],
        },
    },
    {
        path: '/cms/add',
        name: 'Cmsadd',
        component: () => import('./pages/cms/AddCms.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'Pages', label: 'Add cms' }],
        },
    },
    {
        path: '/cms/view/:id',
        name: 'ViewCms',
        exact: true,
        component: () => import('./pages/cms/ViewCms.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'Faq', label: 'View Cms' }],
        },
    },
    {
        path: '/cms/edit/:id',
        name: 'Cmsedit',
        component: () => import('./pages/cms/EditCms.vue'),
        beforeEnter: guard,
        meta: {
            breadcrumb: [{ parent: 'Pages', label: 'Cmsedit' }],
        },
    },
];

const router = createRouter({
    // history: createWebHashHistory(),
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { left: 0, top: 0 };
    },
});

export default router;
