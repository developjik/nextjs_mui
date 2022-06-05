import React from "react";
import * as S from "./CustomTable.styled";
import { AiOutlineCloseCircle } from "react-icons/ai";

function CustomTableBackdropTitle({ title, toggle }) {
  return (
    <S.BackDropTitleWrapper>
      {title}
      <AiOutlineCloseCircle
        size={32}
        onClick={console.log(123)}
      />
    </S.BackDropTitleWrapper>
  );
}

export default CustomTableBackdropTitle;
