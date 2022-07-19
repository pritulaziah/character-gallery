import styled from "@emotion/styled/macro";

interface IProps {
  info: [string, string][];
}

const StyledTable = styled("div")`
  border: 1px solid #e5e6eb;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
`;

const StyledTableCell = styled("div")`
  padding: 8px 20px;
  font-size: 14px;
  line-height: 22px;
`;

const StyledTableLabel = styled(StyledTableCell)`
  background-color: #f7f8fa;
  flex: 1;
  color: #86909c;
`;

const StyledTableRow = styled("div")`
  display: flex;

  & + & {
    border-top: 1px solid #e5e6eb;
  }

  &:first-of-type {
    border-top: none;

    ${StyledTableLabel} {
      border-top-left-radius: 4px;
    }
  }

  &:last-of-type {
    ${StyledTableLabel} {
      border-bottom-left-radius: 4px;
    }
  }
`;

const StyledTableDescription = styled(StyledTableCell)`
  flex: 3;
  color: #1d2129;
  border-left: 1px solid #e5e6eb;
`;

const CharacterInfo = ({ info }: IProps) => (
  <StyledTable>
    {info.map(([label, description]) => (
      <StyledTableRow key={label}>
        <StyledTableLabel>{label}</StyledTableLabel>
        <StyledTableDescription
          dangerouslySetInnerHTML={{
            __html: description
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
              .join(", "),
          }}
        />
      </StyledTableRow>
    ))}
  </StyledTable>
);

export default CharacterInfo;
