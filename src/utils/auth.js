const MOCK_USER = {
  name: "Katelynn",
  email: "katelynn@example.com",
  password: "password123",
};

export const register = (name, email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const existingUser = localStorage.getItem("registeredUser");

      if (existingUser) {
        const user = JSON.parse(existingUser);

        if (user.email === email) {
          reject(new Error("User already exists"));
          return;
        }
      }

      const user = {
        name,
        email,
        password,
      };

      localStorage.setItem("registeredUser", JSON.stringify(user));
      localStorage.setItem(
        "mockUser",
        JSON.stringify({
          name,
          email,
        }),
      );

      resolve({
        name,
        email,
      });
    }, 500);
  });
};

export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const registeredUser = localStorage.getItem("registeredUser");

      if (registeredUser) {
        const user = JSON.parse(registeredUser);

        if (email === user.email && password === user.password) {
          const loggedInUser = {
            name: user.name,
            email: user.email,
          };

          localStorage.setItem("mockUser", JSON.stringify(loggedInUser));

          resolve(loggedInUser);
          return;
        }
      }

      if (email === MOCK_USER.email && password === MOCK_USER.password) {
        const user = {
          name: MOCK_USER.name,
          email: MOCK_USER.email,
        };

        localStorage.setItem("mockUser", JSON.stringify(user));

        resolve(user);
        return;
      }

      reject(new Error("Invalid email or password"));
    }, 500);
  });
};

export const logout = () => {
  localStorage.removeItem("mockUser");
};

export const getCurrentUser = () => {
  const savedUser = localStorage.getItem("mockUser");

  if (!savedUser) {
    return null;
  }

  return JSON.parse(savedUser);
};
