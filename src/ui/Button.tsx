import styled, { css, DefaultTheme } from 'styled-components';

const sizes = {
  small: css`
    font-size: 1rem;
    padding: 0.4rem 0.8rem;
    font-weight: 600;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: .8rem 2rem;
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
    background-color: var(--clr-accent-1);

    &:hover {
      background-color: var(--clr-accent-2);
    }
  `,
  secondary: css`
    background-color: var(--clr-accent-3);

    &:hover {
      background-color: var(--clr-accent-4);
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
    border-radius: 999vw;
    color: var(--color-text-1);
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    ${({ $size }) => sizes[$size as keyof typeof sizes]}; // Cast to keyof typeof sizes
    ${({ $variation }) => variations[$variation as keyof typeof variations]}; // Cast to keyof typeof variations
`;


Button.defaultProps = {
  $variation: 'primary',
  $size: 'large',
};

export default Button;
