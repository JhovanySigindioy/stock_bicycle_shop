export interface InSideBarState {
    isMobilOpen: boolean;
}

export interface InListItemsSidebar {
    title: string;
    path: string;
}

export interface InSideBar {
    drawerWidth: number;
    mobileOpen: boolean;
    listItems: InListItemsSidebar[];
    handleDrawerToggle: () => void;
}

