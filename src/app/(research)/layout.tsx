import Navigation from "@/components/ui/deep-research/Navigation"
import { ProModal } from "@/components/ui/pro-modal";


const AppLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-x-hidden">
            <div className="relative z-10 w-full">
                <ProModal />
                <Navigation />
                {children}
            </div>
        </div>
    )
}


export default AppLayout;