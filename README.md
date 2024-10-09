# Wahlen Dialer

Welcome to the Wahlen Dialer Web Application! This project is a modern web application built using React and Next.js that serves as a comprehensive solution for managing call centre operations. It incorporates various advanced features and technologies to provide a seamless user experience.

## Features

- **Modern React**: Built with the latest React features for a responsive and dynamic user interface.
- **Next.js (App Directory Structure)**: Utilizes Next.js for server-side rendering and an organized file structure.
- **React Server Components**: Explores the capabilities of React Server Components for improved performance and user experience.
- **User Authentication**: Full user authentication lifecycle with custom login functionality.
- **Rate Limiting**: Implemented using Upstash to prevent spam and abuse.
- **Data Fetching**: Modern data fetching techniques with React Query for efficient data management.
- **Local State Management**: Utilizes React's built-in state management without relying on Redux or MobX.
- **UI Components**: Leverages Radix UI for unstyled components and Tailwind CSS for a responsive design.
- **Database Modeling**: Uses Mongoose ORM for modeling MongoDB databases.
- **TypeScript**: Entire application written in TypeScript for improved type safety and maintainability.
- **End-to-End Type Safety**: Utilizes Zod for runtime validation and type safety across the application.

## Installation

To get started with the Call Centre Web Application, follow these steps:

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or hosted)
- Upstash account for rate limiting (optional)

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Kampfer-Programmierer/wahlen-dialer.git
   cd wahlen-dialer
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory and add your configuration variables:
   ```plaintext
   MONGODB_URI=your_mongodb_uri
   UPSTASH_REDIS_URL=your_upstash_redis_url
   UPSTASH_REDIS_TOKEN=your_upstash_redis_token
   NEXTAUTH_SECRET=your_secret
   ```

4. **Run the application**:
   ```bash
   npm run dev
   ```
   The app will be running at `http://localhost:3000`.

## Usage

- Visit the application in your browser and navigate through the user-friendly interface.
- Agents can register, log in, and manage their profiles.
- Experience rate limiting on API requests to prevent abuse.

## Development

- To contribute or make modifications, clone the repository and create a new branch for your features.
- Use the following command to run type checking:
   ```bash
   npm run type-check
   ```

## Testing

- Add tests using your preferred testing framework.
- Run tests with:
   ```bash
   npm test
   ```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Query Documentation](https://react-query.tanstack.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Zod Documentation](https://zod.dev/)
- [Radix UI Documentation](https://www.radix-ui.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.txt) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Contact

For any inquiries, please reach out to [jin_kazama@myyahoo.com].

---

Thank you for checking out the Wahlen Dialer Web Application! We hope you find it useful and informative. Happy coding!
