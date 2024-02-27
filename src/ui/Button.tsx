import styled, { css } from 'styled-components';

const sizes = {
  xs: css`
    font-size: 1rem;
    padding: 0.2rem 0.4rem;
    font-weight: 600;
    min-width: 4rem;
  `,
  small: css`
    font-size: 1rem;
    padding: 0.4rem 0.8rem;
    font-weight: 600;
    min-width: 8rem;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 0.8rem 2rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.8rem;
    padding: 1rem 2rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    background-color: rgba(var(--clr-accent-5), .5);
    color: rgba(var(--clr-text-2));


  `,
  secondary: css`
    background-color: rgba(var(--clr-accent-3));

    &:hover {
      background-color: rgba(var(--clr-accent-4));
    }
  `,
    warning: css`
    background-color: rgba(var(--clr-accent-3));

    &:hover {
      background-color: rgba(var(--clr-accent-4));
    }
  `,
};

type ButtonProps = {
  $size?: keyof typeof sizes;
  $variation?: keyof typeof variations;
};

const Button = styled.button<ButtonProps>`
  text-align: center;
  border: none;
  border-radius: .5em;
  /* color: var(--clr-text-1); */
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
      background-color: rgba(var(--clr-accent-5),.8);
    }

  ${({ $size }) => ($size ? sizes[$size] : Button.defaultProps.$size)};
  ${({ $variation }) =>
    $variation ? variations[$variation] : Button.defaultProps.$variation};
`;

Button.defaultProps = {
  $variation: 'primary',
  $size: 'medium',
};

export default Button;
