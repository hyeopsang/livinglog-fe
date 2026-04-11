export interface Category {
  slug: string;
  label: string;
  children?: Category[];
}

export const CATEGORIES: Category[] = [
  {
    slug: "furniture",
    label: "가구",
    children: [
      {
        slug: "bed",
        label: "침대",
        children: [
          { slug: "bed-frame", label: "침대 프레임" },
          { slug: "bed-accessories", label: "침대 부속 가구" },
          { slug: "bed-mattress", label: "침대 + 매트리스" },
        ],
      },
      {
        slug: "sofa",
        label: "소파",
        children: [
          { slug: "sofa-2", label: "2인 소파" },
          { slug: "sofa-3", label: "3인 소파" },
          { slug: "sofa-bed", label: "소파베드" },
        ],
      },
      {
        slug: "table",
        label: "테이블",
        children: [
          { slug: "dining-table", label: "식탁" },
          { slug: "coffee-table", label: "커피 테이블" },
          { slug: "side-table", label: "사이드 테이블" },
        ],
      },
      {
        slug: "chair",
        label: "의자",
        children: [
          { slug: "dining-chair", label: "식탁 의자" },
          { slug: "arm-chair", label: "안락의자" },
          { slug: "office-chair", label: "사무 의자" },
        ],
      },
      {
        slug: "shelf",
        label: "수납 · 선반",
        children: [
          { slug: "bookshelf", label: "책장" },
          { slug: "cabinet", label: "수납장" },
          { slug: "display-shelf", label: "진열대" },
        ],
      },
    ],
  },
  {
    slug: "kitchen",
    label: "주방",
    children: [
      {
        slug: "kitchen-furniture",
        label: "주방 가구",
        children: [
          { slug: "kitchen-cabinet", label: "주방 수납" },
          { slug: "kitchen-island", label: "아일랜드" },
        ],
      },
      {
        slug: "tableware",
        label: "식기",
        children: [
          { slug: "plate", label: "그릇 · 접시" },
          { slug: "cup", label: "컵 · 잔" },
          { slug: "cutlery", label: "커틀러리" },
        ],
      },
      {
        slug: "kitchen-tools",
        label: "주방 용품",
        children: [
          { slug: "cookware", label: "냄비 · 팬" },
          { slug: "storage", label: "보관 용기" },
        ],
      },
    ],
  },
  {
    slug: "lighting",
    label: "조명",
    children: [
      {
        slug: "ceiling-light",
        label: "천장 조명",
        children: [
          { slug: "pendant", label: "펜던트" },
          { slug: "chandelier", label: "샹들리에" },
          { slug: "downlight", label: "다운라이트" },
        ],
      },
      {
        slug: "floor-lamp",
        label: "스탠드 조명",
        children: [
          { slug: "floor-stand", label: "플로어 스탠드" },
          { slug: "arc-lamp", label: "아크 조명" },
        ],
      },
      {
        slug: "table-lamp",
        label: "테이블 조명",
        children: [
          { slug: "desk-lamp", label: "데스크 조명" },
          { slug: "bedside-lamp", label: "침실 조명" },
        ],
      },
      {
        slug: "wall-light",
        label: "벽 조명",
        children: [
          { slug: "sconce", label: "벽등" },
          { slug: "picture-light", label: "그림 조명" },
        ],
      },
    ],
  },
  {
    slug: "decor",
    label: "장식",
    children: [
      {
        slug: "plant",
        label: "식물 · 화분",
        children: [
          { slug: "indoor-plant", label: "실내 식물" },
          { slug: "pot", label: "화분 · 플랜터" },
        ],
      },
      {
        slug: "art",
        label: "아트 · 액자",
        children: [
          { slug: "poster", label: "포스터" },
          { slug: "frame", label: "액자" },
        ],
      },
      {
        slug: "clock",
        label: "시계",
        children: [
          { slug: "wall-clock", label: "벽시계" },
          { slug: "desk-clock", label: "탁상시계" },
        ],
      },
      {
        slug: "candle",
        label: "캔들 · 디퓨저",
        children: [
          { slug: "scented-candle", label: "향초" },
          { slug: "diffuser", label: "디퓨저" },
        ],
      },
    ],
  },
];

/** slug 배열로 해당 카테고리 찾기 */
export function findCategory(slugs: string[]): Category | null {
  let list = CATEGORIES;
  let found: Category | null = null;
  for (const slug of slugs) {
    found = list.find((c) => c.slug === slug) ?? null;
    if (!found) return null;
    list = found.children ?? [];
  }
  return found;
}

/** slug 배열로 breadcrumb 경로 반환 */
export function getBreadcrumbs(slugs: string[]): Category[] {
  const result: Category[] = [];
  let list = CATEGORIES;
  for (const slug of slugs) {
    const found = list.find((c) => c.slug === slug);
    if (!found) break;
    result.push(found);
    list = found.children ?? [];
  }
  return result;
}
