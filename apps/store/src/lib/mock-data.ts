import type { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import {
  Badge,
  GetBestsellersDocument,
  GetCategoriesDocument,
  GetProductDocument,
  GetProductsDocument,
} from "@livinglog/graphql";

const PRODUCTS = [
  {
    __typename: "Product" as const,
    id: "prod-1",
    brand: "데일리리빙",
    name: "드레스덴 조야패브릭 호텔식 침대프레임",
    originalPrice: 598000,
    discountRate: 15,
    rating: 4.8,
    reviewCount: 1243,
    badges: [Badge.FreeShipping, Badge.Special],
    imageUrl: "/bestseller/best01.avif",
    href: "/products/furniture/bed/bed-frame",
    categorySlug: "bed-frame",
    categoryPath: ["furniture", "bed", "bed-frame"],
    description:
      "호텔 침실의 고급스러운 분위기를 집에서도 느낄 수 있는 조야패브릭 침대프레임입니다. 부드러운 패브릭 소재와 견고한 목재 프레임이 결합되어 내구성과 디자인을 모두 갖추었습니다. 헤드보드의 넉넉한 패딩은 독서나 TV 시청 시 편안한 등받이 역할을 합니다.",
    images: [
      "/bestseller/best01.avif",
      "/bestseller/best02.avif",
      "/bestseller/best03.avif",
    ],
    specifications: [
      { __typename: "ProductSpec" as const, label: "소재", value: "폴리에스터 패브릭, 합판" },
      { __typename: "ProductSpec" as const, label: "색상", value: "아이보리, 그레이, 네이비" },
      { __typename: "ProductSpec" as const, label: "사이즈", value: "퀸(160×200), 킹(180×200)" },
      { __typename: "ProductSpec" as const, label: "높이", value: "헤드보드 110cm" },
      { __typename: "ProductSpec" as const, label: "무게", value: "35kg" },
      { __typename: "ProductSpec" as const, label: "배송", value: "무료배송 (2~3일 이내)" },
    ],
  },
  {
    __typename: "Product" as const,
    id: "prod-2",
    brand: "스피아노",
    name: "홀리스 스윙 플로어 장스탠드 조명",
    originalPrice: 189000,
    discountRate: 10,
    rating: 4.6,
    reviewCount: 872,
    badges: [Badge.FreeShipping],
    imageUrl: "/bestseller/best02.avif",
    href: "/products/lighting/floor-lamp/floor-stand",
    categorySlug: "floor-stand",
    categoryPath: ["lighting", "floor-lamp", "floor-stand"],
    description:
      "스윙 암 디자인으로 조명 방향을 자유롭게 조절할 수 있는 플로어 스탠드입니다. 슬림한 메탈 프레임이 공간에 세련된 포인트를 더하며, 독서등이나 분위기 조명으로 활용하기 좋습니다. 높이 조절이 가능해 소파 옆이나 침대 옆 등 다양한 공간에 적합합니다.",
    images: [
      "/bestseller/best02.avif",
      "/bestseller/best01.avif",
      "/bestseller/best04.avif",
    ],
    specifications: [
      { __typename: "ProductSpec" as const, label: "소재", value: "알루미늄, 스틸" },
      { __typename: "ProductSpec" as const, label: "색상", value: "블랙, 골드, 실버" },
      { __typename: "ProductSpec" as const, label: "높이", value: "140~180cm (조절 가능)" },
      { __typename: "ProductSpec" as const, label: "전구", value: "E26 소켓 (별도 구매)" },
      { __typename: "ProductSpec" as const, label: "전압", value: "220V" },
      { __typename: "ProductSpec" as const, label: "배송", value: "무료배송 (3~5일 이내)" },
    ],
  },
  {
    __typename: "Product" as const,
    id: "prod-3",
    brand: "스피드랙",
    name: "철제 선반 경량랙 펜트리 베란다 선반장",
    originalPrice: 79000,
    discountRate: 5,
    rating: 4.4,
    reviewCount: 3102,
    badges: [Badge.ShippingFee],
    imageUrl: "/bestseller/best03.avif",
    href: "/products/furniture/shelf/cabinet",
    categorySlug: "cabinet",
    categoryPath: ["furniture", "shelf", "cabinet"],
    description:
      "베란다, 펜트리, 주방 등 어디에나 활용 가능한 경량 철제 선반입니다. 조립이 쉽고 단단한 구조로 무거운 물건도 안전하게 보관할 수 있습니다. 선반 높이를 자유롭게 조절할 수 있어 다양한 수납 환경에 맞게 설치할 수 있습니다.",
    images: [
      "/bestseller/best03.avif",
      "/bestseller/best01.avif",
      "/bestseller/best02.avif",
    ],
    specifications: [
      { __typename: "ProductSpec" as const, label: "소재", value: "냉연 강판 (분체도장)" },
      { __typename: "ProductSpec" as const, label: "색상", value: "화이트, 블랙" },
      { __typename: "ProductSpec" as const, label: "크기", value: "W900×D450×H1800mm" },
      { __typename: "ProductSpec" as const, label: "단 수", value: "5단 (높이 조절 가능)" },
      { __typename: "ProductSpec" as const, label: "내하중", value: "단당 80kg" },
      { __typename: "ProductSpec" as const, label: "배송", value: "배송비 별도 (3,000원)" },
    ],
  },
  {
    __typename: "Product" as const,
    id: "prod-4",
    brand: "바이에스컴퍼니",
    name: "레트로 플립 탁상시계 인테리어 디자인 소품",
    originalPrice: 45000,
    discountRate: 20,
    rating: 4.7,
    reviewCount: 521,
    badges: [Badge.Special, Badge.FreeShipping],
    imageUrl: "/bestseller/best04.avif",
    href: "/products/decor/clock/desk-clock",
    categorySlug: "desk-clock",
    categoryPath: ["decor", "clock", "desk-clock"],
    description:
      "빈티지 플립 보드 방식으로 시간을 표시하는 레트로 탁상시계입니다. 페이지가 넘어가는 듯한 독특한 연출이 공간에 개성을 더하며, 인테리어 소품으로도 손색이 없습니다. 조용한 무음 모터를 사용해 침실이나 서재에도 잘 어울립니다.",
    images: [
      "/bestseller/best04.avif",
      "/bestseller/best03.avif",
      "/bestseller/best01.avif",
    ],
    specifications: [
      { __typename: "ProductSpec" as const, label: "소재", value: "ABS 플라스틱, 메탈" },
      { __typename: "ProductSpec" as const, label: "색상", value: "블랙, 화이트" },
      { __typename: "ProductSpec" as const, label: "크기", value: "W150×D60×H100mm" },
      { __typename: "ProductSpec" as const, label: "전원", value: "USB-C 또는 AA건전지 2개" },
      { __typename: "ProductSpec" as const, label: "기능", value: "시간, 날짜, 알람" },
      { __typename: "ProductSpec" as const, label: "배송", value: "무료배송 (1~2일 이내)" },
    ],
  },
];

function writeProductsQuery(
  client: ApolloClient<NormalizedCacheObject>,
  categoryId: string | null,
  items: typeof PRODUCTS,
) {
  client.writeQuery({
    query: GetProductsDocument,
    variables: { filter: categoryId ? { categoryId } : null },
    data: {
      products: {
        __typename: "ProductConnection",
        items,
        total: items.length,
        hasMore: false,
      },
    },
  });
}

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
          href: "/products/furniture",
        },
        {
          __typename: "Category",
          id: "cat-2",
          label: "조명",
          imageUrl: "/categories/lighting.avif",
          href: "/products/lighting",
        },
        {
          __typename: "Category",
          id: "cat-3",
          label: "수납 · 정리",
          imageUrl: "/categories/cabinet.avif",
          href: "/products/decor",
        },
        {
          __typename: "Category",
          id: "cat-4",
          label: "장식",
          imageUrl: "/categories/decor.avif",
          href: "/products/decor",
        },
      ],
    },
  });

  client.writeQuery({
    query: GetBestsellersDocument,
    data: { bestsellers: PRODUCTS },
  });

  writeProductsQuery(client, null, PRODUCTS);

  const categoryMap = new Map<string, typeof PRODUCTS>();
  for (const product of PRODUCTS) {
    for (const slug of product.categoryPath) {
      if (!categoryMap.has(slug)) categoryMap.set(slug, []);
      categoryMap.get(slug)!.push(product);
    }
  }
  for (const [categoryId, items] of categoryMap) {
    writeProductsQuery(client, categoryId, items);
  }

  for (const product of PRODUCTS) {
    client.writeQuery({
      query: GetProductDocument,
      variables: { id: product.id },
      data: { product },
    });
  }
}
