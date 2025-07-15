import BgGradient from "@/components/ui/bg-gradient";
import Navigation from "@/components/ui/deep-research/Navigation"
import { ProModal } from "@/components/ui/pro-modal";


const AppLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <BgGradient>
        <div className="relative min-h-screen w-full bg-white flex flex-col items-center justify-center overflow-hidden">
            <div className="relative z-10 w-full">
                <ProModal />
                <Navigation />
                {children}
            </div>
        </div>
        </BgGradient>
    )
}


export default AppLayout;