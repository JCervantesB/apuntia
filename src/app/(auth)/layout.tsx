export const runtime = 'edge';
const AuthLayout =  ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex-1 flex items-center justify-center">
                {children}
            </div>
        </div>
    )
}

export default AuthLayout