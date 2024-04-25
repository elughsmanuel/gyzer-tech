import cron from 'node-cron';
import UserRepository from '../user/repositories/userRepository';
import EmailService from '../utils/mailer';

export const monthlyReminderCron = (userRepository: UserRepository) => {
    cron.schedule('0 0 1 * * *', async () => {
        const users = await userRepository.getAllUsersForReminder();

        const usersData = users.map(user => user.get({ plain: true }))

        usersData.forEach( async (cur) => {
            const evaluationUrl = `${process.env.BASE_URL}/dashboard/add-evaluation`;

            await new EmailService(
                cur,
                evaluationUrl,
            ).sendMonthlyReminder();

        });
    });
};

export const followUpReminderCron = (userRepository: UserRepository) => {
    cron.schedule('0 0 4-31 * *', async () => {
        const users = await userRepository.getAllUsersForReminder();

        const usersData = users.map(user => user.get({ plain: true }))

        usersData.forEach( async (cur) => {
            const evaluationUrl = `${process.env.BASE_URL}/dashboard/add-evaluation`;

            await new EmailService(
                cur,
                evaluationUrl,
            ).sendFollowUpReminder();

        });
    });
};
