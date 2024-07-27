import { gql } from "@refinedev/nestjs-query";

export const DASHBOARD_TOTAL_COUNTS_QUERY = gql`
    query DashboardTotalCounts {
        companies {
            totalCount
        }
        contacts {
            totalCount
        }
        deals {
            totalCount
        }
    }
`;
