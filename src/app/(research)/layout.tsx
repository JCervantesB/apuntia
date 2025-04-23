
import Navigation from "@/components/ui/deep-research/Navigation"
import { ProModal } from "@/components/ui/pro-modal";


const AppLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative min-h-screen w-full bg-white flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute -top-20 -left-20 w-[300px] h-[300px] bg-violet-300 rounded-full blur-3xl opacity-20 z-0" />
            <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] bg-indigo-300 rounded-full blur-3xl opacity-20 z-0" />
            <div className="relative z-10 w-full">
                <ProModal />
                <Navigation />
                {children}
            </div>
        </div>
    )
}


export default AppLayout;