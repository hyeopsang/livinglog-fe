import type { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import {
  Badge,
  GetBestsellersDocument,
  GetCategoriesDocument,
} from "@livinglog/graphql";

export function seedMockData(client: ApolloClient<NormalizedCacheObject>) {
  client.writeQuery({
    query: GetCategoriesDocument,
    data: {
      categories: [
        {
          __typename: "Category",
          id: "cat-1",
          label: "가구",
          imageUrl: "/categories/table.avif",
          href: "/",
        },
        {
          __typename: "Category",
          id: "cat-2",
          label: "조명",
          imageUrl: "/categories/lighting.avif",
          href: "/",
        },
        {
          __typename: "Category",
          id: "cat-3",
          label: "수납 · 정리",
          imageUrl: "/categories/cabinet.avif",
          href: "/",
        },
        {
          __typename: "Category",
          id: "cat-4",
          label: "장식",
          imageUrl: "/categories/decor.avif",
          href: "/",
        },
      ],
    },
  });

  client.writeQuery({
    query: GetBestsellersDocument,
    data: {
      bestsellers: [
        {
          __typename: "Product",
          id: "prod-1",
          brand: "데일리리빙",
          name: "드레스덴 조야패브릭 호텔식 침대프레임",
          originalPrice: 598000,
          discountRate: 15,
          rating: 4.8,
          reviewCount: 1243,
          badges: [Badge.FreeShipping, Badge.Special],
          imageUrl: "/bestseller/best01.avif",
          href: "/",
        },
        {
          __typename: "Product",
          id: "prod-2",
          brand: "스피아노",
          name: "홀리스 스윙 플로어 장스탠드 조명",
          originalPrice: 189000,
          discountRate: 10,
          rating: 4.6,
          reviewCount: 872,
          badges: [Badge.FreeShipping],
          imageUrl: "/bestseller/best02.avif",
          href: "/",
        },
        {
          __typename: "Product",
          id: "prod-3",
          brand: "스피드랙",
          name: "철제 선반 경량랙 펜트리 베란다 선반장",
          originalPrice: 79000,
          discountRate: 5,
          rating: 4.4,
          reviewCount: 3102,
          badges: [Badge.ShippingFee],
          imageUrl: "/bestseller/best03.avif",
          href: "/",
        },
        {
          __typename: "Product",
          id: "prod-4",
          brand: "바이에스컴퍼니",
          name: "레트로 플립 탁상시계 인테리어 디자인 소품",
          originalPrice: 45000,
          discountRate: 20,
          rating: 4.7,
          reviewCount: 521,
          badges: [Badge.Special, Badge.FreeShipping],
          imageUrl: "/bestseller/best04.avif",
          href: "/",
        },
      ],
    },
  });
}
