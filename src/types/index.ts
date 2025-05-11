export type SidebarItemType = {
  label: string;
  href: string;
  icon: React.ReactElement;
};

export type ResponseErrorJSON = {
  response?: {
    data?: {
      error?: {
        message: string;
      };
    };
  };
};
