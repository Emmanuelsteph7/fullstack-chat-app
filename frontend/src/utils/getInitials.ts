export const getInitials = (name: string | undefined) => {
  let initials = "";

  if (name) {
    const splittedName = name.split(" ");

    const firstName = splittedName[0];
    const lastName = splittedName[1];

    if (firstName) {
      initials = firstName.slice(0, 1).toUpperCase();
    }

    if (lastName) {
      initials = initials + lastName.slice(0, 1).toUpperCase();
    }
  }

  return initials;
};
