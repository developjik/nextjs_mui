import { Chip } from "@material-ui/core";
import React from "react";

import * as S from "./CustomTable.Styled";

function CustomTableTitle({ title, instance }) {
  const { rows } = instance;

  return (
    <S.TableTitleWrapper>
      <S.TableTitle>
        <S.TableTitleContent>{title}</S.TableTitleContent>
        <S.TableTitleContent>
          <Chip
            label={"total: " + rows.length}
            color="primary"
            variant={"outlined"}
          />
        </S.TableTitleContent>
        <S.TableTitleContent>
          <Chip
            label={"fail: " + rows.length}
            color="secondary"
            variant={"outlined"}
          />
        </S.TableTitleContent>
      </S.TableTitle>
    </S.TableTitleWrapper>
  );
}

export default CustomTableTitle;
