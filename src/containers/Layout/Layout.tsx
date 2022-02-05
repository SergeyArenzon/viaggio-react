
import TopBar from '../../components/TopBar/TopBar';


interface LayoutChildren {
    children: React.ReactChild
}

export default function Layout({ children }: LayoutChildren) {
    return (
        <div>
            <TopBar />
            <main>{children}</main>
        </div>
    );
}
