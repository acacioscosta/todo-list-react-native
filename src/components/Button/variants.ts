interface ButtonStyle {
  button: {
    backgroundColor: string;
    borderWidth?: number;
    borderColor?: string;
  },
  title: {
    color: string
  },
  icon: {
    color: string
  }
}

interface ButtonVariant {
  enabled: ButtonStyle;
  disabled: ButtonStyle;
}

import { ThemeType } from '../../contexts/ThemeContext';

export const createVariants = (theme: ThemeType) => {
  const buttonPrimary: ButtonVariant = {
    enabled: {
      button: {
        backgroundColor: theme.primary,
      },
      title: {
        color: theme.buttonText,
      },
      icon: {
        color: theme.buttonText,
      }
    },
    disabled: {
      button: {
        backgroundColor: theme.buttonDisabled,
      },
      title: {
        color: theme.buttonText,
      },
      icon: {
        color: theme.buttonText,
      }
    }
  }

  const buttonOutline: ButtonVariant = {
    enabled: {
      button: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: theme.primary,
      },
      title: {
        color: theme.primary,
      },
      icon: {
        color: theme.primary,
      }
    },
    disabled: {
      button: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: theme.borderColor,
      },
      title: {
        color: theme.borderColor,
      },
      icon: {
        color: theme.borderColor,
      }
    }
  }

  const warning: ButtonVariant = {
    enabled: {
      button: {
        backgroundColor: theme.error,
      },
      title: {
        color: theme.buttonTextWarning,
      },
      icon: {
        color: theme.buttonTextWarning,
      }
    },
    disabled: {
      button: {
        backgroundColor: theme.buttonDisabled,
      },
      title: {
        color: theme.buttonText,
      },
      icon: {
        color: theme.buttonText,
      }
    }
  }

  const warningOutline: ButtonVariant = {
    enabled: {
      button: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: theme.error,
      },
      title: {
        color: theme.error,
      },
      icon: {
        color: theme.error,
      }
    },
    disabled: {
      button: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: theme.borderColor,
      },
      title: {
        color: theme.borderColor,
      },
      icon: {
        color: theme.borderColor,
      }
    }
  }

  return {
    primary: buttonPrimary,
    outline: buttonOutline,
    warning,
    warningOutline
  };
}