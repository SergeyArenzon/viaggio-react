import TopBar from '../../components/TopBar/TopBar.tsx';

export default function Layout({ children }) {
    return (
        <div>
            <TopBar />
            <main>{children}</main>
        </div>
    );
}
