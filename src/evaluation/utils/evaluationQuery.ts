export class evaluationQuery {
    static buildEvaluationQuery(
        evaluateeId?: string,
        evaluatorId?: string,
        month?: string,
        year?: string,
        minWorkQualityScore?: number,
        maxWorkQualityScore?: number,
        minTaskCompletionScore?: number,
        maxTaskCompletionScore?: number,
        minAboveAndBeyondScore?: number,
        maxAboveAndBeyondScore?: number,
        minCommunication?: number,
        maxCommunication?: number,
        search?: string,
    ): any {
        const query: any = {};

        if (evaluateeId) {
          	query.evaluateeId = evaluateeId;
        }

        if (evaluatorId) {
            query.evaluatorId = evaluatorId;
        }

        if (month) {
            query.month = month;
        }

        if (year) {
            query.year = year;
        }
    
        if (minWorkQualityScore !== undefined) {
          	query.workQualityScore = query.workQualityScore || {};
          	query.workQualityScore.$gte = minWorkQualityScore;
        }
    
        if (maxWorkQualityScore !== undefined) {
          	query.workQualityScore = query.workQualityScore || {};
          	query.workQualityScore.$lte = maxWorkQualityScore;
        }

        if (minTaskCompletionScore !== undefined) {
            query.taskCompletionScore = query.taskCompletionScore || {};
            query.taskCompletionScore.$gte = minTaskCompletionScore;
        }
      
          if (maxTaskCompletionScore !== undefined) {
            query.taskCompletionScore = query.taskCompletionScore || {};
            query.taskCompletionScore.$lte = maxTaskCompletionScore;
        }

        if (minAboveAndBeyondScore !== undefined) {
            query.aboveAndBeyondScore = query.aboveAndBeyondScore || {};
            query.aboveAndBeyondScore.$gte = minAboveAndBeyondScore;
        }
      
          if (maxAboveAndBeyondScore !== undefined) {
            query.aboveAndBeyondScore = query.aboveAndBeyondScore || {};
            query.aboveAndBeyondScore.$lte = maxAboveAndBeyondScore;
        }

        if (minCommunication !== undefined) {
            query.communication = query.communication || {};
            query.communication.$gte = minCommunication;
        }
      
          if (maxCommunication !== undefined) {
            query.communication = query.communication || {};
            query.communication.$lte = maxCommunication;
        }

        if (search) {
			query.$or = [
				{ name: { $regex: search, $options: 'i' } },
				{ description: { $regex: search, $options: 'i' } },
			];
      }

        return query;
    }

    static buildSortOptions(
        sortBy?: string,
        sortOrder?: string,
    ) : any {
        const sortOptions: any = {};
    
        if (sortBy) {
          	const validSortFields = ['workQualityScore', 'taskCompletionScore', 'aboveAndBeyondScore', 'communication'];
			
			if (validSortFields.includes(sortBy)) {
				sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
			}
        }

        return sortOptions;
    }
}
