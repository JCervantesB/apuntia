
import Navigation from "@/components/ui/deep-research/Navigation"
import { ProModal } from "@/components/ui/pro-modal";


const AppLayout = async ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <ProModal />
            <Navigation />
            {children}
        </div>
    )
}

export default AppLayout;