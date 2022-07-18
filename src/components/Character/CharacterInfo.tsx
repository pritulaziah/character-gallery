import styled from "@emotion/styled/macro";

interface IProps {
  info: [string, string][];
}

const TableStyled = styled("div")`
  border: 1px solid #e5e6eb;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
`;

const TableRowStyled = styled("div")`
  display: flex;

  & + & {
    border-bottom: 1px solid #e5e6eb;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const TableCellStyled = styled("div")`
  padding: 8px 20px;
  font-size: 14px;
  line-height: 22px;
`;

const TableLabelStyled = styled(TableCellStyled)`
  background-color: #f7f8fa;
  flex: 1;
  color: #86909c;
`;

const TableDescriptionStyled = styled(TableCellStyled)`
  flex: 3;
  color: #1d2129;
  border-left: 1px solid #e5e6eb;
`;

const CharacterInfo = ({ info }: IProps) => (
  <TableStyled>
    {info.map(([label, description]) => (
      <TableRowStyled>
        <TableLabelStyled>{label}</TableLabelStyled>
        <TableDescriptionStyled
          dangerouslySetInnerHTML={{
            __html: description
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
              .join(", "),
          }}
        />
      </TableRowStyled>
    ))}
  </TableStyled>
);

export default CharacterInfo;
