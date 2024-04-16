import { styled } from "styled-components";
import { Icon } from "../../../../components";


const ContactsContainer = ({ className }) => {

    return (
        <div className={className}>
                    Наши контакты:
                        <div className="contacts">
                            +7 (937) 881-85-78
                        </div>
                        <div className="contacts-messenger">
                            <a href="https://vk.com/club190177686">
                            <Icon 
                                id="fa-vk" 
                                size="40px"
                                margin="-6px 0 0 0"
                                color='#2552d7'
                            />
                            </a>
                            <a href="https://t.me/Elite_inza">
                            <Icon 
                                id="fa-telegram" 
                                size="30px"
                                color='#2552d7'
                            />
                            </a>
                        </div>
        </div>
    )
   
};

export const Contacts = styled(ContactsContainer)`
    display: flex;
    flex-direction: column;
    font-style: italic; 
    .contacts-messenger {
        display: flex;
        align-items: center;
        gap: 10px;
    }

`;