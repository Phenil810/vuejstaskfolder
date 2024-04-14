<template>
    <div class="menu-wrapper" :class="{ 'layout-sidebar-active': sidebarActive }" @click="onMenuClick" @mouseover="onSidebarMouseOver" @mouseleave="onSidebarMouseLeave">
        <div class="sidebar-logo">
            <router-link to="/">
                <!-- <img src="assets/layout/images/Logo.png" style="height:35px;width:auto;" alt="D.A.LAB" /> -->
                <img v-show="rend2" v-bind:src="logo1" style="height: 25px; width: auto" alt="GS Community" />
                <img v-show="rend" v-bind:src="logogscommunity" alt="GS Community" style="width: 115%;" />
                <!-- <img src="assets/layout/images/wallet.png" style="height:35px;width:auto;" alt="samsung" />
                <img v-show="rend" src="assets/layout/images/raiPlanner2.png" alt="Account_Book" style="width:auto;height:35px;" /> -->
                <!-- <b style="padding-left: 15px; font-size: 23px;color:#728FCE">{{ title }}</b> -->
            </router-link>
            <a class="sidebar-pin" @click="onToggleMenu($event)">
                <span class="pin"></span>
            </a>
        </div>

        <div class="layout-menu-container">
            <AppSubmenu
                class="layout-menu"
                :items="GS_community"
                :layoutMode="layoutMode"
                :parentMenuItemActive="true"
                :menuActive="menuActive"
                :mobileMenuActive="mobileMenuActive"
                :root="true"
                @menuitem-click="onMenuItemClick"
                @root-menuitem-click="onRootMenuItemClick"
            />
            <!-- <div @click="logout">
                <div>
                    <span class="logout-btn">
                        <i class="pi pi-sign-out"></i>
                        {{ mouse_over ? 'Logout' : '' }}
                    </span>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import AppSubmenu from './AppSubmenu';
export default {
    name: 'AppMenu',
    emits: ['menu-click', 'menuitem-click', 'root-menuitem-click', 'toggle-menu', 'sidebar-mouse-over', 'sidebar-mouse-leave'],
    props: {
        sidebarActive: Boolean,
        sidebarStatic: Boolean,
        layoutMode: String,
        menuActive: Boolean,
        mobileMenuActive: Boolean,
    },
    data() {
        return {
            logo1: '/assets/layout/images/gs_logo.png',
            logogscommunity: '/assets/layout/images/gs_community_logo.png',
            rend: false,
            rend2: true,
            mouse_over: false,
            adminset: '',
            superadmin: [
                // { label: 'Dashboard', icon: 'pi pi-home', to: '/' },
                { label: this.$t(`module.title.DFCMangement`), icon: 'pi pi-users', to: '/dfc-management' },
                // { label: this.$t(`module.title.BannerMangement`), icon: 'pi pi-images', to: '/banner-management' },
                // { label: this.$t(`module.title.PopupMangement`), icon: 'pi pi-question-circle', to: '/popup-management' },
                // { label: this.$t(`module.title.NFTMangement`), icon: 'pi pi-bell', to: '/nft-management' },
                // { label: this.$t(`module.title.CardnewsMangement`), icon: 'pi pi-book', to: '/card-news' },
                // { label: this.$t(`module.title.MediaPressMangement`), icon: 'pi pi-bell', to: '/media-press' },
                // { label: this.$t(`module.title.GoogleformsMangement`), icon: 'pi pi-tags', to: '/google-form' },
                // { label: this.$t(`module.title.FrontendPopupManagement`), icon: 'pi pi-desktop', to: '/FrontendPopup-management' },
            ],
            GS_community: [
                { label: this.$t(`Complex Management`), icon: 'pi pi-list', to: '/ComplexManagementList' },
                {
                    label: this.$t(`User Management`),
                    icon: 'pi pi-users',
                    items: [
                        { label: this.$t('General User Management'), icon: 'pi pi-comments', to: '/UserManagement/GeneralUserManagement/GeneralUserManagementList' },
                        { label: this.$t('Admin User Management'), icon: 'pi pi-question-circle', to: '/UserManagement/AdminUserManagement/AdminUserManagementlist' },
                        
                    ],
                },
                // { label: this.$t(`User Management`), icon: 'pi pi-users', to: '/UserManagementList' },
                { label: this.$t(`Post Management`), icon: 'pi pi-comments', to: '/PostManagementList' },
                { label: this.$t(`Honey History`), icon: 'pi pi-money-bill', to: '/HoneyManagementList' },
                { label: this.$t(`Reward Management`), icon: 'pi pi-dollar', to: '/RewardManagementList' },
                {
                    label: this.$t(`General Management`),
                    icon: 'pi pi-id-card',
                    items: [
                        { label: this.$t('Notice Management'), icon: 'pi pi-comments', to: '/GeneralManagement/NoticeManagement/NoticeManagementlist' },
                        { label: this.$t('Notification Management'), icon: 'pi pi-microsoft', to: '/GeneralManagement/NotificationManagement/NotificationManagementList' },
                        { label: this.$t('Tag Management'), icon: 'pi pi-question-circle', to: '/GeneralManagement/TagManagement/TagManagementlist' },
                        { label: this.$t('Subscription Path Management'), icon: 'pi pi-tags', to: '/GeneralManagement/Subscriptionpathmanagement/Subscriptionpathmanagementlist' },
                    ],
                },
                { label: this.$t(`Product management`), icon: 'pi pi-microsoft', to: '/ProductManagementList' },
                { label: this.$t(`Product Purchase Management`), icon: 'pi pi-briefcase', to: '/ProductPurchaseManagementList' },
                // { label: this.$t(`Promotional Post Management`), icon: 'pi pi-th-large', to: '/PromotionalPostManagement/PromotionalPostManagementList' },
                { label: this.$t(`Hot Post Management`), icon: 'pi pi-folder', to: '/HotPostManagementList' },
                { label: this.$t(`Honey Transfer History`), icon: 'pi pi-desktop', to: '/HoneyTransferHistoryList' },
                { label: this.$t(`Weekly Report`), icon: 'pi pi-book', to: '/DownloadWeeklyReport/WeeklyReport' },
            ],
            samsung: [
                // { label: 'Dashboard', icon: 'pi pi-home', to: '/' },
                { label: this.$t(`User Management`), icon: 'pi pi-users', to: '/user' },
                // { label: this.$t(`Product Category Management`), icon: 'pi  pi-th-large', to: '/ProductCategorylist' },

                {
                    label: this.$t(`Statistical Management`),
                    icon: 'pi pi-id-card',
                    items: [
                        { label: this.$t('Shop Category Statistics'), icon: 'pi pi-comments', to: '/statistics/shop_category' },
                        { label: this.$t('Product Category Statistics'), icon: 'pi pi-question-circle', to: '/statistics/product_category' },
                    ],
                },
                {
                    label: this.$t(`Customer Service`),
                    icon: 'pi pi-bell',
                    items: [
                        { label: this.$t('1:1 inquiry'), icon: 'pi pi-comments', to: '/1.1_inquiry' },
                        { label: this.$t('report'), icon: 'pi pi-question-circle', to: '/report' },
                    ],
                },
                { label: this.$t(`Survey List`), icon: 'pi pi-book', to: '/survey' },
                { label: this.$t(`Receipt Info`), icon: 'pi pi-tags', to: '/receipt' },
                { label: this.$t(`Coupon Management`), icon: 'pi pi-check-square', to: '/coupon' },
                { label: this.$t(`Notification Management`), icon: 'pi pi-list', to: '/notification' },
            ],
            dfc_user: [{ label: this.$t(`module.title.Client-lookup`), icon: 'pi pi-users', to: '/client-lookup' }],
            menu: [
                { label: 'Dashboard', icon: 'pi pi-home', to: '/' },
                { label: 'User management', icon: 'pi pi-users', to: '/user' },
                { label: 'Banner management', icon: 'pi pi-images', to: '/banner-management' },
                { label: 'FAQ', icon: 'pi pi-question-circle', to: '/faq' },
                { label: 'Notice', icon: 'pi pi-bell', to: '/notice' },
                { label: 'CMS', icon: 'pi pi-book', to: '/cms' },
                {
                    label: 'Inquiry',
                    icon: 'pi pi-inbox',
                    items: [
                        { label: 'Inquiry type', icon: 'pi pi-tags', to: '/inquiry-type' },
                        { label: '1:1 inquiry', icon: 'pi pi-comments', to: '/inquiry' },
                    ],
                },
                // onprogress ==> file not ready , when the file ll be ready change the path
                {
                    label: 'UI Kit',
                    icon: 'pi pi-star-o',
                    items: [
                        { label: 'Form Layout', icon: 'pi pi-id-card', to: '/formlayout' },
                        { label: 'Input', icon: 'pi pi-check-square', to: '/input' },
                        { label: 'Float Label', icon: 'pi pi-bookmark', to: '/floatlabel' },
                        { label: 'Invalid State', icon: 'pi pi-exclamation-circle', to: '/invalidstate' },
                        { label: 'Button', icon: 'pi pi-mobile', to: '/button', class: 'rotated-icon' },
                        { label: 'Table', icon: 'pi pi-table', to: '/table' },
                        { label: 'List', icon: 'pi pi-list', to: '/list' },
                        { label: 'Tree', icon: 'pi pi-share-alt', to: '/tree' },
                        { label: 'Panel', icon: 'pi pi-tablet', to: '/panel' },
                        { label: 'Overlay', icon: 'pi pi-clone', to: '/overlay' },
                        { label: 'Media', icon: 'pi pi-image', to: '/media' },
                        { label: 'Menu', icon: 'pi pi-bars', to: '/menu' },
                        { label: 'Message', icon: 'pi pi-comment', to: '/messages' },
                        { label: 'File', icon: 'pi pi-file', to: '/file' },
                        { label: 'Chart', icon: 'pi pi-chart-bar', to: '/chart' },
                        { label: 'Misc', icon: 'pi pi-circle-off', to: '/misc' },
                    ],
                },
                {
                    label: 'Utilities',
                    icon: 'pi pi-compass',
                    items: [
                        { label: 'Display', icon: 'pi pi-desktop', to: '/display' },
                        { label: 'Elevation', icon: 'pi pi-external-link', to: '/elevation' },
                        { label: 'Flexbox', icon: 'pi pi-directions', to: '/flexbox' },
                        { label: 'Icons', icon: 'pi pi-search', to: '/icons' },
                        { label: 'Text', icon: 'pi pi-pencil', to: '/text' },
                        { label: 'Widgets', icon: 'pi pi-star-o', to: '/widgets' },
                        { label: 'Grid System', icon: 'pi pi-th-large', to: '/grid' },
                        { label: 'Spacing', icon: 'pi pi-arrow-right', to: '/spacing' },
                        { label: 'Typography', icon: 'pi pi-align-center', to: '/typography' },
                    ],
                },
                {
                    label: 'Pages',
                    icon: 'pi pi-briefcase',
                    items: [
                        { label: 'Crud', icon: 'pi pi-pencil', to: '/crud' },
                        { label: 'Calendar', icon: 'pi pi-calendar-plus', to: '/calendar' },
                        { label: 'Timeline', icon: 'pi pi-calendar', to: '/timeline' },
                        { label: 'Landing', icon: 'pi pi-globe', url: 'assets/pages/landing.html', target: '_blank' },
                        { label: 'Login', icon: 'pi pi-sign-in', to: '/login' },
                        { label: 'Invoice', icon: 'pi pi-dollar', to: '/invoice' },
                        { label: 'Help', icon: 'pi pi-question-circle', to: '/help' },
                        { label: 'Error', icon: 'pi pi-times-circle', to: '/error' },
                        { label: 'Not Found', icon: 'pi pi-exclamation-circle', to: '/notfound' },
                        { label: 'Access Denied', icon: 'pi pi-lock', to: '/access' },
                        { label: 'Empty', icon: 'pi pi-circle-off', to: '/empty' },
                    ],
                },
                {
                    label: 'Hierarchy',
                    icon: 'pi pi-align-left',
                    items: [
                        {
                            label: 'Submenu 1',
                            icon: 'pi pi-align-left',
                            items: [
                                {
                                    label: 'Submenu 1.1',
                                    icon: 'pi pi-align-left',
                                    items: [
                                        { label: 'Submenu 1.1.1', icon: 'pi pi-align-left' },
                                        { label: 'Submenu 1.1.2', icon: 'pi pi-align-left' },
                                        { label: 'Submenu 1.1.3', icon: 'pi pi-align-left' },
                                    ],
                                },
                                {
                                    label: 'Submenu 1.2',
                                    icon: 'pi pi-align-left',
                                    items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-align-left' }],
                                },
                            ],
                        },
                        {
                            label: 'Submenu 2',
                            icon: 'pi pi-align-left',
                            items: [
                                {
                                    label: 'Submenu 2.1',
                                    icon: 'pi pi-align-left',
                                    items: [
                                        { label: 'Submenu 2.1.1', icon: 'pi pi-align-left' },
                                        { label: 'Submenu 2.1.2', icon: 'pi pi-align-left' },
                                    ],
                                },
                                {
                                    label: 'Submenu 2.2',
                                    icon: 'pi pi-align-left',
                                    items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-align-left' }],
                                },
                            ],
                        },
                    ],
                },
                {
                    label: 'Start',
                    icon: 'pi pi-download',
                    items: [
                        { label: 'Buy Now', icon: 'pi pi-shopping-cart', command: () => window.open('https://www.primefaces.org/store', '_blank') },
                        { label: 'Documentation', icon: 'pi pi-info-circle', to: '/documentation' },
                    ],
                },
            ],
        };
    },
    // mounted() {
    //     if (localStorage.getItem('admin-type') === 'admin') {
    //         this.adminset = this.superadmin;
    //     }else{
    //         this.adminset = this.dfc_user;
    //     }
    // },
    methods: {
        onSidebarMouseOver() {
            if (this.layoutMode === 'sidebar' && !this.sidebarStatic) {
                this.$emit('sidebar-mouse-over');
                this.rend = true;
                this.rend2 = false;
                this.mouse_over = true;
            }
        },
        onSidebarMouseLeave() {
            if (this.layoutMode === 'sidebar' && !this.sidebarStatic) {
                setTimeout(() => {
                    this.$emit('sidebar-mouse-leave');
                    this.rend = false;
                    this.rend2 = true;
                    this.mouse_over = false;
                }, 250);
            }
        },

        logout() {
         
            localStorage.removeItem('UserName');
            localStorage.removeItem('UserEmail');
            localStorage.removeItem('token');
            this.$router.push({ name: 'login' });
        },
        // onSidebarMouseLeave() {
        //     if (this.layoutMode === 'sidebar' && !this.sidebarStatic) {
        //         setTimeout(() => {
        //             this.$emit('sidebar-mouse-leave');
        //             this.rend = false;
        //             this.mouse_over=false;
        //         }, 250);
        //     }
        // },
        onToggleMenu(event) {
            this.$emit('toggle-menu', event);
        },
        onMenuClick(event) {
            this.$emit('menu-click', event);
        },
        onMenuItemClick(event) {
            this.$emit('menuitem-click', event);
        },
        onRootMenuItemClick(event) {
            this.$emit('root-menuitem-click', event);
        },
    },
    components: { AppSubmenu },
};
</script>
<style>
.logout-btn {
    position: absolute;
    bottom: 20px;
    display: block;
    width: 100%;
    padding: 0 20px;
    color: #000;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
}
.logout-btn:hover {
    color: var(--primary-color);
}
.logout-btn i {
    font-size: 24px;
    vertical-align: middle;
}
.p-button2 {
    background: transparent;
    border: none;
    color: #000;
}
</style>