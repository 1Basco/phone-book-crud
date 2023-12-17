export interface MainLayoutProps {
    children: JSX.Element | JSX.Element[]
}
export function MainLayout({ children }: MainLayoutProps): JSX.Element {
    return (
        <>
            <main className="w-full h-screen">
                <div className="container m-auto pt-16 flex flex-col justify-center items-center">
                    {children}
                </div>
            </main>
        </>
    );
}