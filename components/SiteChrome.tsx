import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import styles from "./SiteChrome.module.css";
import { APPLICATIONS_OPEN } from "@/lib/applicationStatus";

type SiteChromeProps = Readonly<{
  children: React.ReactNode;
}>;

export default function SiteChrome({ children }: SiteChromeProps) {
  return (
    <>
      {APPLICATIONS_OPEN ? (
        <Link
          href="/apply"
          className={styles.applicationBanner}
          data-analytics-event="apply_page_click"
          data-analytics-label="site-banner"
          data-analytics-impression="apply_page_cta"
        >
          <span className={styles.applicationBannerText}>
            Applications for 2026 are now open!
          </span>
          <span className={styles.applicationBannerAction}>Apply here</span>
        </Link>
      ) : null}
      <Navbar />
      <div className="flex-1 flex flex-col grow">{children}</div>
      <Footer />
    </>
  );
}
