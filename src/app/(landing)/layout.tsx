export const runtime = 'edge';
const LandingLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="min-h-screen bg-[#111827] overflow-auto">
            <div className="mx-auto max-w-screen-xl min-h-screen w-full">
                {children}  
            </div>
        </div>
    )
}
export default LandingLayout
