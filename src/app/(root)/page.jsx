import Frontpage from "@/components/feature/comp_homepage/landing/frontpage";

export default async function page({ searchParams }) {
  const activeTabs = (await searchParams)?.tab;
  return (
    <>
      <Frontpage activeTab={activeTabs} />
    </>
  );
}
