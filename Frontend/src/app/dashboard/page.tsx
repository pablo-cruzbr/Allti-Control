import styles from '../dashboard/dashboard.module.scss'
import Sidebar from '../components/sidebar/Sidebar';
import Content from '../components/content/content';
import Profile from '../components/profile/profile';
import Calendar from '../components/calendar/calendar'
import Compras from './compras/page';
export const dynamic = 'force-dynamic';
export default function Dashboard(){
 return(
        <div className={styles.dashboardContent}>
            <Content/>
        </div>
    )
}