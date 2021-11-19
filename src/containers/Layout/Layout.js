import TopBar from './TopBar/TopBar';

export default function Layout({ children }) {
    return (
        <div>
            {/* <TopBar /> */}
            <main>{children}</main>
        </div>
    );
}
