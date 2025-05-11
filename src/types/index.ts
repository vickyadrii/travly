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

export type Pagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type Meta = {
  pagination: Pagination;
};
