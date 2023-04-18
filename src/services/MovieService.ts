import { Movie } from "../models/movies-model";
import db from '../db';
import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2';

type QueryResult = RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader;

async function query<T = QueryResult>(sql: string, params: any[] = []): Promise<T> {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (error: any, results: QueryResult) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results as T);
    });
  });
}

const MovieService = {
  getAll: async (): Promise<Movie[]> => {
    return query<Movie[]>('SELECT * FROM Movies');
  },

  getMovie: async (internalId: number): Promise<Movie | false> => {
    const results = await query<Movie[]>('SELECT * FROM movies WHERE internalId = ?', [internalId]);
    return results.length ? results[0] : false;
  },

  setMovie: async (movie: Movie) => {
    await query('INSERT INTO movies (id, name, type) VALUES (?, ?, ?)', [
      movie.id,
      movie.name,
      movie.type
    ]);
  },

  deleteMovie: async (internalId: number): Promise<any> => {
    const result = await query('DELETE FROM movies WHERE internalId = ?', [internalId]);
    return result;
  },
  
};

export default MovieService;
