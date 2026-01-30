import ContentHeader  from './contentHeader'
import styles from '../../styles/content.module.scss';
import CardList from '../cardList/cardList';
import Card from '../card/TicketsCount'
import Calendar from '../calendar/calendar'
export default function content(){
    return(
        <section>
            <ContentHeader/>    
            <CardList/>
        </section>
    )
}