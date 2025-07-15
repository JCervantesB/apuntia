import SummaryReport from "./SummaryReport";

interface Props {
    params: { id: string };
}

const Page = async ({ params }: Props) => {
    const { id } = await params;

    return <SummaryReport id={id} />;
};

export default Page;
