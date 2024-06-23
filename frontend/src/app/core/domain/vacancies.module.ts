import { UserModule } from './user.module';

export interface VacanciesModule {
  id: string;
  title: string;
  descriptions: string;
  requirements: string[];
  createdAt: Date;
  updatedAt: Date | null;
}

export interface VacanciesWithUsersModule extends VacanciesModule {
  users: UserModule[];
}

export interface VacanciesRequestModule {
  title: string;
  description: string;
  requirements: string[];
}

export interface CreateVacanciesRequestModule extends VacanciesRequestModule {}

export interface UpdateVacanciesRequestModule extends VacanciesRequestModule {}
