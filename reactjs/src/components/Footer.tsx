import { version } from "../../package.json"; 

const year = new Date().getFullYear();

export const Footer = () => (
    <footer className="w-full text-center py-6 text-gray-400 text-sm border-t border-gray-700 bg-gray-800 mt-12">
        &copy; {year} React Blogs App using Supabase &middot; v{version}
    </footer>
);

export default Footer;
