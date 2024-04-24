import cron from 'node-cron';
import UserRepository from '../user/repositories/userRepository';
import EmailService from '../utils/mailer';

export const monthlyReminderCron = (userRepository: UserRepository) => {
    cron.schedule('0 0 1 * * *', async () => {
        const users = await userRepository.getAllUsersForReminder();

        const usersData = users.map(user => user.get({ plain: true }))

        usersData.forEach( async (cur) => {
            const evaluationUrl = `http://localhost:8000/evaluation`;

            await new EmailService(
                cur,
                evaluationUrl,
            ).sendMonthlyReminder();

        });
    });
};

export const followUpReminderCron = (userRepository: UserRepository) => {
    cron.schedule('0 0 */3 1 * *', async () => {
        const users = await userRepository.getAllUsersForReminder();

        const usersData = users.map(user => user.get({ plain: true }))

        usersData.forEach( async (cur) => {
            const evaluationUrl = `http://localhost:8000/evaluation`;

            await new EmailService(
                cur,
                evaluationUrl,
            ).sendFollowUpReminder();

        });
    });
};
