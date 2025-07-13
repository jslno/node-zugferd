/* eslint-disable import/no-extraneous-dependencies */
import { inject } from 'vitest';


process.env.VITEST = 'true';

const globalSetup = inject('globalSetup');

// Exports for test use
export const MUSTANG_JAR_PATH = globalSetup.MUSTANG_JAR_PATH;
