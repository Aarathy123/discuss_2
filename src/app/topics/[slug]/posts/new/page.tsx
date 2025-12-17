export default async function PostCreatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <div>Post Create Page {slug}</div>;
}