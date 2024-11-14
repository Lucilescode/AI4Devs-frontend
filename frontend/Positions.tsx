import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import { Position } from './Position';
import { Candidate } from './Candidate';

const Positions: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const history = useHistory();
	const [position, setPosition] = useState<Position | null>(null);
	const [candidates, setCandidates] = useState<Candidate[]>([]);

	useEffect(() => {
		const fetchPositionData = async () => {
			const positionResponse = await axios.get(`/position/${id}/interviewFlow`);
			setPosition(positionResponse.data);
		};

		const fetchCandidates = async () => {
			const candidatesResponse = await axios.get(`/position/${id}/candidates`);
			setCandidates(candidatesResponse.data);
		};

		fetchPositionData();
		fetchCandidates();
	}, [id]);

	const onDragEnd = async (result: any) => {
		if (!result.destination) return;

		const { source, destination } = result;
		const movedCandidate = candidates.find((c) => c.id === result.draggableId);
		if (movedCandidate) {
			movedCandidate.current_interview_step = destination.droppableId;
			await axios.put(`/candidate/${movedCandidate.id}`, {
				new_interview_step: destination.droppableId,
			});
			setCandidates([...candidates]);
		}
	};

	if (!position) return <div>Loading...</div>;

	return (
		<div>
			<button onClick={() => history.push('/positions')}>← Back</button>
			<h1>{position.positionName}</h1>
			<DragDropContext onDragEnd={onDragEnd}>
				<div style={{ display: 'flex', overflowX: 'auto' }}>
					{position.interviewSteps.map((step) => (
						<Droppable key={step.id} droppableId={step.id}>
							{(provided) => (
								<div
									ref={provided.innerRef}
									{...provided.droppableProps}
									style={{ margin: '0 8px', minWidth: '200px' }}
								>
									<h2>{step.name}</h2>
									{candidates
										.filter(
											(candidate) =>
												candidate.current_interview_step === step.id
										)
										.map((candidate, index) => (
											<Draggable
												key={candidate.id}
												draggableId={candidate.id}
												index={index}
											>
												{(provided) => (
													<div
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
														style={{
															padding: '8px',
															margin: '0 0 8px 0',
															backgroundColor: 'white',
															border: '1px solid lightgrey',
															borderRadius: '4px',
															...provided.draggableProps.style,
														}}
													>
														<p>{candidate.name}</p>
														<p>Score: {candidate.score}</p>
													</div>
												)}
											</Draggable>
										))}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					))}
				</div>
			</DragDropContext>
		</div>
	);
};

export default Positions;
