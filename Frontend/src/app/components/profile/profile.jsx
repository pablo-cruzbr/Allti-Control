import React from 'react';
import styles from '../../styles/profile.module.scss';
import ProfileHeader from '../profile/profileHeader';
import Image from "next/image";
import userImage from '../../../../src/assets/photo.svg';
import {BiBook} from 'react-icons/bi'
export default function Profile() {

    const cards =[
        {
            tittle: 'React',
            duration: '2 Hours',
            icon: <BiBook/>
        },

        {
            tittle: 'NextJS',
            duration: '2 Hours',
            icon: <BiBook/>
        },

        {
            tittle: 'NodeJS',
            duration: '2 Hours',
            icon: <BiBook/>
        }
    ]
    return (
        <div className={styles.profile}>
            <ProfileHeader />

            <div className={styles.userProfile}>
                <div className={styles.userDetail}>
                    <div className={styles.userImage}>
                        <Image
                            src={userImage}
                            alt="PhotoUser"
                            width={100}
                            height={128}
                            style={{borderRadius: '50%'}}
                            
                        />
                    </div>
                    <h3 className={styles.username}>Pablo Cruz</h3>
                    <span className={styles.profession}>Desenvolvedor FullStack</span>
                </div>
                <div className={styles.listCards}>
                    {cards.map((items) => (
                        <div className={styles.card} key={items.tittle}>
                            {items.tittle}  
                            <div className={styles.cardDetail}>
                                {items.duration}
                                <div className={styles.cardCouver}>
                                    {items.icon}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
