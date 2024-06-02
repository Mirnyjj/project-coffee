import { styled } from "styled-components";
import { Input } from "../input/input";
import { Icon } from "../icon/icon";
import { Target } from "../../models/models";

type Props = {
    className?: string
    searchPhrase: string
    onChange: ({target}: Target) => void
  }

const SearchContainer = ({className, searchPhrase, onChange}: Props) => {
    
    return (
        <div className={className}>
            <Input value={searchPhrase} placeholder="Поиск..." onChange={onChange}/>
            <Icon 
                    inactive={true}
                    id="fa-search" 
                    size="21px"
                    />
        </div>

    )
    
};

export const Search = styled(SearchContainer)`
    display: flex;
    position: relative;
    width: 340px;
    height: 40px;
    margin: 30px auto 0;
    & > input {
        padding: 10px 35px 10px 15px;
    }
    & > div {
        position: absolute;
        top: 3px;
        right: 10px;
    }
`;
