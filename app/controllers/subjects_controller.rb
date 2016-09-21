class SubjectsController < ApplicationController
	def index
		@subject=Subject.all

	end
	def show
		begin
		@subject=Subject.find(params[:id])
		#if @subject
			render :json => @subject, :status => :ok
		# else
		# 	render :json => @subject.errors, :status => :unprocessable_entity
		# end
		rescue => e
			p e.message
			render :json => { "error" => e.message}, :status => :unprocessable_entity
		end
	end
	def new
		@subject=Subject.new()
	end
	def edit 
	 	@subject = Subject.find(params[:id])
	 end
	def create
		@subject=Subject.new(subject_param)
		if @subject.save
			render :json => @subject, :status  => :ok
		else
			render :json => @subject.errors, :status => :unprocessable_entity
		end
	end
	def update
		begin
		@subject=Subject.find(params[:id])
		if @subject.update_attributes(subject_param)
			render :json => @subject, :status => :ok
		else
			render :json => @subject.errors, :status  => :unprocessable_entity
		end
		rescue => e
			p e.message
			render :json => {"error" => e.message}, :status =>:unprocessable_entity
		end
	end
	
	
	def destroy
		begin
		@subject=Subject.find(params[:id])
		if @subject
			@subject.destroy
			render :json => @subject, :status => :ok
		else
			render :json => @subject.errors, :status  => :unprocessable_entity
		end
		
		rescue => e
			p e.message
			render :json => {"error" => e.message}, :status => :unprocessable_entity
		end
	end
	private 
	def subject_param
		 params.require(:subject).permit(:name)
	end
end
