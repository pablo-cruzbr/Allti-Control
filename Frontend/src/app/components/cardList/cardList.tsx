import React from 'react';
import styles from '../../components/cardList/cardList.module.scss';
import Calendar from '../calendar/calendar';

export default function dashboard(){
    return(
        <section>
            <div className={styles.headerClient}>
                <Calendar/>
            </div>
        </section>
    )
}